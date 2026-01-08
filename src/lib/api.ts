import axios, {
  type AxiosRequestConfig,
  type AxiosError,
} from 'axios';
import { toast } from 'sonner';
import { setLoading } from '@/context/loading/external';

// CONFIG
const REQUEST_TIMEOUT =
  Number(import.meta.env.VITE_AXIOS_TIMEOUT) || 15_000; // 15 s default

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_URL,
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: REQUEST_TIMEOUT,
});

let authToken: string | null = null;
let activeRequests = 0;

// AUTH TOKEN
export function setAuthToken(token: string | null) {
  authToken = token;
}

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  activeRequests++;
  setLoading(true);

  if (authToken) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  return config;
});

// SHARED REFRESH PROMISE
let refreshPromise: Promise<string | null> | null = null;

// RESPONSE / ERROR INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(activeRequests - 1, 0);
    if (activeRequests === 0) setLoading(false);
    return response;
  },
  async (error: AxiosError) => {
    activeRequests = Math.max(activeRequests - 1, 0);
    if (activeRequests === 0) setLoading(false);

    const originalConfig = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };


    // Handle timeout explicitly
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
      return Promise.reject(error);
    }

    // Skip if original request was refresh itself
    if (originalConfig.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    // Skip toast for login failures – let page handle it
    if (originalConfig.url === '/auth/login') {
      return Promise.reject(error);
    }
    
    // Automatic token refresh
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = api
            .post<{ access_token: string }>('/auth/refresh', undefined, {
              withCredentials: true,
            })
            .then((res) => {
              const newToken = res.data.access_token;
              if (!newToken) {
                // Redirect to login but don't clear localStorage
                // This preserves user data even when token refresh fails
                window.location.href = '/login?expired=true';
                return null;
              }
              setAuthToken(newToken);
              return newToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const token = await refreshPromise;
        if (!token) throw new Error('Refresh failed');

        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers['Authorization'] = `Bearer ${token}`;
        return api(originalConfig);
      } catch (refreshErr) {
        // Redirect to login with expired parameter to indicate session expiration
        // This helps preserve user data in localStorage
        window.location.href = '/login?expired=true';
        return Promise.reject(refreshErr);
      }
    }


    // Generic error toast
    const err = error as AxiosError<{ detail?: string; message?: string }>;
    const detail =
      (err.response?.data as { detail?: unknown })?.detail ??
      err.response?.data?.message;
    const message =
      typeof detail === 'string' ? detail : err.message || 'Request failed';
    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;
