import React from "react";
import "../layout.css";

function Layout({ children }) {

const userMenu ={
  
}
  return (
    <div className="main">
      <div className="d-flex-layout">
        <div className="sidebar">
            <div className="card">
                
            </div>
        </div>
      </div>

      <div className="content">
        <div className="header"></div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
