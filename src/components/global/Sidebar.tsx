import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { useTranslation } from "@/context/i18n/useTranslation"
import { LanguageSwitcher } from "./LanguageSwitcher"
import {
  Menu,
  LayoutDashboard,
  ListChecks,
  PhoneCall,
  Settings,
  Database,
  DoorClosed,
  PersonStanding
} from "lucide-react"
import { useAuth } from "@/context/auth/useAuth"
import { UserRoleConst } from "@/constants/user-role"

const menu = [
  { path: "/", label: "sidebar.dashboard", icon: LayoutDashboard },
  { path: "/keywords", label: "sidebar.keywords", icon: ListChecks },
  { path: "/contact", label: "sidebar.contact", icon: PhoneCall },
  { path: "/score-settings", label: "sidebar.scoreSettings", icon: Settings, roles: [UserRoleConst.ADMIN, UserRoleConst.SUPER_ADMIN] },
  { path: "/batch-history", label: "sidebar.batchHistory", icon: Database },
  { path: "/user-management", label: "sidebar.userManagement", icon: PersonStanding, roles: [UserRoleConst.ADMIN, UserRoleConst.SUPER_ADMIN] },
  { path: "/logout", label: "sidebar.logout", icon: DoorClosed },
]
export default function Sidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const userRole = user?.role?.role_name || "";

  const visibleMenu = menu.filter(item => {
    if (!item.roles) return true; // No restriction
    
    // Check if userRole matches any of the roles in item.roles
    return item.roles.some(role => role === userRole);
  });

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden px-4 py-2 bg-gray-900 text-white flex justify-between items-center shadow-md">
        <span className="text-xl font-semibold">{t("common.appName")}</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out"
          >
            <nav className="space-y-2 mt-4">
              {visibleMenu.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800 ${
                      isActive ? "bg-gray-800 text-white" : "text-gray-400"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {t(label)}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 flex-col w-60 bg-gray-900 text-white h-screen">
        <div className="px-6 py-4 text-2xl font-semibold">{t("common.appName")}</div>
        <nav className="flex-1 px-4 space-y-1">
          {visibleMenu.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800 ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {t(label)}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 flex flex-col gap-2 text-xs text-gray-500">
          <LanguageSwitcher />
          <span>v0.1.0</span>
        </div>
      </aside>
    </>
  );
}
