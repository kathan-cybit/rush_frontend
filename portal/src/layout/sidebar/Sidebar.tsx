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

export default function Sidebar({ tenantType }: any) {
  const pathName = useLocation()?.pathname;
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [collapsed, setCollapsed] = useState(true);
  const [opened, setOpened] = useState(false);

  const toggleCollapsed = () => setCollapsed((c) => !c);
  const toggleOpened = () => setOpened((o) => !o);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const getActiveNavItem = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    return "dashboard";
  };

  const navItems =
    tenantType != "admin"
      ? [
          // {
          //   key: "license",
          //   label: "License Management",
          //   icon: LicenseIcn,
          // },
          {
            key: "home",
            label: "Go Home",
            icon: HomeIcn,
          },
          {
            key: "usermanagement",
            label: "User Management",
            icon: UserIcn,
          },
          {
            key: "roles",
            label: "Role & Permissions",
            icon: RoleIcn,
          },
        ]
      : [
          {
            key: "roles",
            label: "Role & Permissions",
            icon: RoleIcn,
          },
          {
            key: "home",
            label: "Go Home",
            icon: HomeIcn,
          },
        ];

  const handleSidebarNavigate = (key: string) => {
    switch (key) {
      // case "license":
      //   navigate("/license");
      //   break;
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
