import React from "react";
import "./navbar.css";

export default function Navbar({ toggleSidebar }: any) {
  return (
    <nav className="flex items-center p-3 custom-navbar">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div
            className="xl:hidden block inline-flex justify-center items-center bg-transparent px-4 py-2 pt-2 border border-gray-800 rounded font-medium text-gray-800"
            onClick={toggleSidebar}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <h1 className="mb-0 nav-title">All Licenses</h1>
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
    </nav>
  );
}
