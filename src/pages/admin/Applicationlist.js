import React from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { Table, Tag } from "antd";


function Applicationlist() {
  const dispatch = useDispatch();
  const [apps, setApps] = useState([]);
  const getApplications = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-apps", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setApps([...response.data.data]);    
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  const changeFormStatus = async (record, status) => {
    try {
      const response = await axios.post(
        "/api/admin/change-form-status",
        { _id: record._id,  status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading())
      if(response.data.success){
      getApplications()
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getApplications();
  }, []);
  const columns = [
    {
      title: "App - Id",
      dataIndex: '_id',
    
    },
    {
      title: "Name",
      dataIndex: "name",
    },
   
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
    },
    ,
    {
      title: "Status",
      dataIndex: "status",
      render:(text,record) => <h5 style={{cursor:'pointer'}}><span class="badge bg-warning">{record.status}</span></h5>
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "Pending" && (
            <h5 style={{cursor:'pointer'}}><span class="badge bg-success"
              onClick={() => changeFormStatus(record, "Approved")}
            >
              Approve
              </span></h5>
          )}
          {record.status === "Approved" && (
            <h5 style={{cursor:'pointer'}}><span class="badge bg-danger"
              onClick={() => changeFormStatus(record, "Blocked")}
            >
              Block
              </span></h5>
          )}
        </div>
      ),
    },
  ];
 return (
    <Layout>
      <h1 className="pageheader p-3">Applications</h1>
      <Table columns={columns} dataSource={apps} />
    </Layout>
  );
}

export default Applicationlist;
