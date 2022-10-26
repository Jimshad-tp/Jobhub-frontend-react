import React from "react";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Button } from "antd";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Applicationform from "./pages/Applicationform";
import Userlist from "./pages/admin/Userlist";
import Applicationlist from "./pages/admin/Applicationlist";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
         <Route
          path="/getform"
          element={
            <ProtectedRoute>
              <Applicationform />
            </ProtectedRoute>
          }
        />       
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userlist />
            </ProtectedRoute>
          }
        /><Route
        path="/admin/app-list"
        element={
          <ProtectedRoute>
            <Applicationlist />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
