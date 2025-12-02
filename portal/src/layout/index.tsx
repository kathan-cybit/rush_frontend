import React, { useState } from "react";
import { AppShell } from "@mantine/core";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import AdminNavbar from "./navbar/AdminNavbar";
import "./layout.css";
import { RootState } from "../store/store";

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
      <AppShell.Header>
        {showTenantNavbar && <Navbar toggleSidebar={toggleSidebar} />}
        {showTenantAdminNavbar && <AdminNavbar toggleSidebar={toggleSidebar} />}
        {showAdminNavbar && <AdminNavbar toggleSidebar={toggleSidebar} />}
      </AppShell.Header>

      {/* SIDEBAR SECTION */}
      {showSidebar && (
        <AppShell.Navbar>
          <Sidebar isOpen={true} />
        </AppShell.Navbar>
      )}

      {/* MAIN CONTENT */}
      <AppShell.Main
        className={
          currentPathname === "/dashboard" || roleType === "admin"
            ? "admin-content admin-container mx-auto px-2 sm:px-6 lg:px-6 xl:pl-0"
            : "content"
        }
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
