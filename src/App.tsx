import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '@/components/global/Sidebar';
import Dashboard from '@/pages/Dashboard';
import KeywordManagement from "@/pages/KeywordManagement";
import UserManagement from '@/pages/UserManagement';
import ScoreSettings from '@/pages/ScoreSettings';
import BatchHistory from '@/pages/BatchHistory';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import PrivateRoute from '@/components/global/PrivateRoute';
import RoleRoute from '@/components/global/RoleRoute';
import KeywordPage from '@/pages/KeywordPage';
import ContactManagement from '@/pages/ContactManagement';
import Unauthorized from '@/pages/Unauthorized';
import { UserRoleConst } from '@/constants/user-role';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <div className="min-h-screen lg:pl-60">
              <Sidebar />
              <main className="pt-14 lg:pt-4 overflow-auto bg-gray-50 p-6 min-h-screen">
                <Outlet />
              </main>
            </div>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="keywords" element={<KeywordManagement />} />
          <Route path="keywords/:id" element={<KeywordPage />} />
          <Route path="contact/:id?" element={<ContactManagement />} />
          <Route path="batch-history/:id?" element={<BatchHistory />} />
          <Route path="logout" element={<Logout />} />

          {/* Admin-only routes */}
          <Route element={<RoleRoute allowedRoles={[UserRoleConst.ADMIN, UserRoleConst.SUPER_ADMIN]} />}>
            <Route path="user-management" element={<UserManagement />} />
            <Route path="score-settings" element={<ScoreSettings />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
