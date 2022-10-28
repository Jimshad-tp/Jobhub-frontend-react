import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

 
function Userlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);


  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  const changeUserStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-user-status",
        { _id: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {

        toast.success(response.data.message);
        // setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      render:(text,record) => <h4 className="badge bg-primary">{record.status}</h4>

    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "active" && (
            <span 
              className="badge bg-danger"
              onClick={() => changeUserStatus(record, "blocked")}
            >
              Block
            </span>
          )}
          {record.status === "blocked" && (
            <span
              className="badge bg-success"
              onClick={() => changeUserStatus(record, "active")}
            >
              Active
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="pageheader p-3">Users list</h1>
      <Table columns={columns} dataSource={users} />
     
    </Layout>
  );
}

export default Userlist;
