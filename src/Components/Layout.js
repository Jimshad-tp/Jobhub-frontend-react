import React, { useState, useEffect } from "react";
import "../layout.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Form, Input, Button } from "antd";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/form", values);



    } catch (error) {
      console.log(error)
    }
  };
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

  ];

  const adminrMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-5-fill",
    },
    {
      name: "Application form",
      path: "/getform",
      icon: "ri-file-list-2-fill",
    }

  ];

  const menuToBeRendered = user?.isAdmin ? adminrMenu : userMenu

  return (
    <div className="main">
      <div className="d-flex-layout">
        <div className='sidebar'>
          <h1 className="text" > MEDICARE </h1>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path
              return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            })}
            <div className='d-flex menu-item' onClick={() => {
              localStorage.clear()
              navigate('/login')
            }}>
              <i className='ri-logout-box-fill'></i>
              <Link> Logout</Link>
            </div>

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


        <div className="body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
