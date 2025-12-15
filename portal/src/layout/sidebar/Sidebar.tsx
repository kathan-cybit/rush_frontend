import { useLocation, useNavigate } from "react-router-dom";

import {
  AuthIcn,
  HomeIcn,
  LicenseIcn,
  RoleIcn,
  UserIcn,
} from "../../assets/svgs";
import { logo } from "../../assets/img";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import {
  AppShellNavbar,
  AppShellSection,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  Sidebar as EirisSidebar,
  UnstyledButton,
} from "../../shared-components/ui";
import { useState } from "react";
import BackIcn from "../../assets/svgs/BackIcn";

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
