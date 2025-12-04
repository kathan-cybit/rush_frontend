import React from "react";
import { logo } from "../../assets/img";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function AdminNavbar({ toggleSidebar }: any) {
  const { roleType } = useSelector((state: RootState) => state.auth);

  const naviagte = useNavigate();

  return (
    <nav className="flex items-center p-3 custom-admin-navbar">
      <div className="px-2 sm:px-6 lg:px-6 xl:pl-0 w-full admin-container">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <div
              className="xl:hidden block inline-flex justify-center items-center bg-transparent px-4 py-2 pt-2 border border-gray-800 rounded font-medium text-gray-800"
              onClick={toggleSidebar}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
            <div
              className="sidebar-eriis-logo"
              onClick={() => {
                naviagte("/");
              }}
            >
              <img src={logo} />
            </div>
            {roleType == "admin" && (
              <>
                <NavLink
                  to="/"
                  className="mt-2 px-3 py-2 border rounded-md font-medium text-black-300 hover:text-blue-900 text-lg"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/roles"
                  className="mt-2 px-3 py-2 border rounded-md font-medium text-black-300 hover:text-blue-900 text-lg"
                >
                  Roles
                </NavLink>
              </>
            )}
          </div>
          <div>
            <div className="flex gap-2">
              <div className="nav-notify"></div>
              <div className="flex items-center gap-2 nav-profile-parent">
                <div className="nav-profile"></div>
                <div>
                  <h2 className="p-name">Rishabh Gangwar</h2>
                  <h3 className="p-role">Admin</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
