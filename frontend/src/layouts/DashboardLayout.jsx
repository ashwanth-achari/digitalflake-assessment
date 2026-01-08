import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="admin-panel-layout">
      {/* Sidebar */}
      <aside className="apl-sidebar">
        
        <nav className="apl-nav">
          <NavLink to="/" className="apl-link">
            
            <span>Users</span>
          </NavLink>
          <NavLink to="/category" className="apl-link">
            
            <span>Contacts</span>
          </NavLink>
        </nav>
      </aside>
      <main className="apl-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
