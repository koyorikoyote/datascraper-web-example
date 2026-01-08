import axios from "@/lib/api";

export const hubspotApi = {
  account: () => axios.get("/hubspot/account/", { withCredentials: true }),

  authorize: () => axios.get("/hubspot/authorize/", { withCredentials: true }),

  // Not used, automatic refresh handled in API
  refresh: (hubId: string) =>
    axios.get(`/hubspot/refresh/${hubId}/`, { withCredentials: true }),

  contact_send: (contactTemplateId: string) =>
    axios.get(`/hubspot/contact-send/${contactTemplateId}/`, {
      withCredentials: true
    }),

  getContactSendList: (contactTemplateId: string) =>
    axios.get(`/hubspot/contact-send-list/${contactTemplateId}/`, {
      withCredentials: true
    }),

  listCompanies: (params?: { 
    limit?: number; 
    after?: string | null; 
    batch_id?: number 
  }) =>
    axios.get("/hubspot/companies/", {
      params,
      withCredentials: true,
    }),
};
