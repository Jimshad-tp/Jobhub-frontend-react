import React from 'react'
import Layout from "../../Components/Layout";
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { Table, Tag } from "antd";


function Applicationlist() {
  const dispatch = useDispatch()
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
        console.log(apps,"hkhewprhqapirhpi3r")
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  const applicationApprove = async (record, status) => {

  };
  useEffect(() => {

    getApplications()

  },[])
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Company name",
      dataIndex: "companyname",
    },
    {
      title: "Problem",
      dataIndex: "problem",
    },
    {
      title: "Address",
      dataIndex: "address",
    }, {
      title: "Mobile",
      dataIndex: "phone",
    },
    , {
      title: "status",
      dataIndex: "status",
    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "active" && (
            <span
              className="span"
              onClick={() => applicationApprove(record, "blocked")}
            >
              Block
            </span>
          )}
          {record.status === "blocked" && (
            <span
              className="span"
              onClick={() => applicationApprove(record, "active")}
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
      <h1 className="pageheader p-3">Applications</h1>
      <Table columns={columns} dataSource={apps} />
    </Layout>
  )
}

export default Applicationlist