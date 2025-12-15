import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import AdminNavbar from "./navbar/AdminNavbar";
import "./layout.css";
import { RootState } from "../store/store";
import { AppShell, AppShellMain } from "../shared-components/ui";
import CustomFooter from "./footer/CustomFooter";

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPathname = location.pathname;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = (): void => setIsOpen((prev) => !prev);

  const { tenantType } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(true);
  const [opened, setOpened] = useState(false);
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
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <Sidebar tenantType={tenantType} />

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
