import React, { useState } from "react";
import "../layout.css";
import {Link, useLocation} from 'react-router-dom'
import { useSelector } from "react-redux";


function Layout({ children }) {
const {user} =useSelector((state) => state.user)
  const location = useLocation()
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-5-fill",
    },
    {
      name: "Application form",
      path: "/getform",
      icon: "ri-file-list-2-fill",
    },
    {
      name: "View Application",
      path: "/viewapplication",
      icon: "ri-list-unordered",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-fill",
    },
  ];

  const menuToBeRendered = userMenu;

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-5-fill",
    },
    {
      name: "users",
      path: "/users",
      icon: "ri-file-list-2-fill",
    },

  
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-fill",
    },
  ];

  const adminToBeRendered = adminMenu;
  return (
    <div className="main">
      <div className="d-flex-layout">
        <div className= 'sidebar'>
          <h1 className="text" > MEDICARE </h1>         
        
        <div className="menu">
          {menuToBeRendered.map((menu) => {
            const isActive = location.pathname === menu.path
            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
              <i className={menu.icon}></i>
              <Link to={menu.path}>{menu.name}</Link>
            </div>
          })}
        </div>
        </div>
      </div>

      <div className="content">
        <div className="header">

        <i className="ri-close-circle-fill close-icon"></i>
      <div className="d-flex align-items-center">
      <Link className="anchor" to='/profile' >{user?.name.toUpperCase()}</Link>
      </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
