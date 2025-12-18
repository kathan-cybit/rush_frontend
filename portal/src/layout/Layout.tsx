import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import AdminNavbar from "./navbar/AdminNavbar";
import "./layout.css";
import { AppDispatch, RootState } from "../store/store";
import { AppShell, AppShellMain } from "../shared-components/ui";
import CustomFooter from "./footer/CustomFooter";
import { setLogout } from "../store/reducers/authSlice";
import { HomeIcn, RoleIcn, UserIcn } from "../assets/svgs";
import { useMediaQuery } from "@mantine/hooks";
import { getAllUsersRolesPermissions } from "../store/reducers/tenantSlice";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { tenantType, user } = useSelector((state: RootState) => state.auth);

  const { tenants, isLoading, allUsersRolesPermissions } = useSelector(
    (state: RootState) => state.tenant
  );
  const [collapsed, setCollapsed] = useState(true);
  const [opened, setOpened] = useState(false);

  const handleNavigateHome = () => {
    navigate("/");
  };
  const handleNavigateProfile = () => {
    navigate("/");
  };

  const handleNavigateSettings = () => {
    navigate("/");
  };
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsed = () => setCollapsed((c) => !c);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const getActiveNavItem = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    return "dashboard";
  };
  const host = new URL(window.location.href).hostname.split(".")[0];
  const hasManageOrgSettings = allUsersRolesPermissions?.roles?.some((role) =>
    role.permissions?.some((perm) => perm?.slug == "manage_org_settings")
  );

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

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
      navbar={{
        width: collapsed ? 80 : 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AdminNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleNavigateProfile={handleNavigateProfile}
        handleNavigateHome={handleNavigateHome}
        handleNavigateSettings={handleNavigateSettings}
        handleLogout={handleLogout}
      />
      {(user?.is_default_admin ||
        tenantType == "admin" ||
        hasManageOrgSettings) && (
        <Sidebar
          tenantType={tenantType}
          getActiveNavItem={getActiveNavItem}
          toggleCollapsed={toggleCollapsed}
          collapsed={collapsed}
          navItems={navItems}
          isMobile={isMobile}
        />
      )}
      <AppShellMain
        className="flex flex-col h-full overflow-hidden"
        // className={
        //   currentPathname == "/dashboard" || tenantType == "admin"
        //     ? "admin-content admin-container mx-auto px-2 sm:px-6 lg:px-6 xl:pl-0"
        //     : "content"
        // }
      >
        <Outlet />
      </AppShellMain>
      <CustomFooter />
    </AppShell>
  );
};

export default Layout;
