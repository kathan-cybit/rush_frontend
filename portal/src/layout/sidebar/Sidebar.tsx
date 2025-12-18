import { useLocation, useNavigate } from "react-router-dom";

import { Sidebar as EirisSidebar } from "../../shared-components/ui";

export default function Sidebar({
  getActiveNavItem,
  toggleCollapsed,
  collapsed,
  tenantType,
  navItems,
  isMobile,
}: any) {
  const handleSidebarNavigate = (key: string) => {
    switch (key) {
      case "usermanagement":
        navigate(`/usermanagement`);
        break;
      case "roles":
        navigate(`/roles`);
        break;
      default:
        navigate(`/dashboard`);
    }
  };
  const navigate = useNavigate();

  return (
    <EirisSidebar
      navItems={navItems}
      collapsed={isMobile ? false : collapsed}
      toggleCollapsed={toggleCollapsed}
      activeNavItem={getActiveNavItem()}
      onNavigate={handleSidebarNavigate}
    />
  );
}
