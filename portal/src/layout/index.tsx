import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import AdminNavbar from "./navbar/AdminNavbar";
import "./layout.css";
import { RootState } from "../store/store";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "../shared-components/ui";

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPathname = location.pathname;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = (): void => setIsOpen((prev) => !prev);

  const { roleType } = useSelector((state: RootState) => state.auth);

  const showTenantNavbar =
    roleType === "tenant" && currentPathname !== "/dashboard";
  const showTenantAdminNavbar =
    roleType === "tenant" && currentPathname === "/dashboard";
  const showAdminNavbar = roleType === "admin";

  const showSidebar = roleType === "tenant" && currentPathname !== "/dashboard";

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 240,
        breakpoint: "lg",
        collapsed: { mobile: !isOpen },
      }}
    >
      {/* HEADER SECTION */}
      <AppShellHeader>
        {showTenantNavbar && <Navbar toggleSidebar={toggleSidebar} />}
        {showTenantAdminNavbar && <AdminNavbar toggleSidebar={toggleSidebar} />}
        {showAdminNavbar && <AdminNavbar toggleSidebar={toggleSidebar} />}
      </AppShellHeader>

      {/* SIDEBAR SECTION */}
      {showSidebar && (
        <AppShellNavbar>
          <Sidebar isOpen={true} />
        </AppShellNavbar>
      )}

      {/* MAIN CONTENT */}
      <AppShellMain
        className={
          currentPathname === "/dashboard" || roleType === "admin"
            ? "admin-content admin-container mx-auto px-2 sm:px-6 lg:px-6 xl:pl-0"
            : "content"
        }
      >
        <Outlet />
      </AppShellMain>
    </AppShell>
  );
};

export default Layout;
