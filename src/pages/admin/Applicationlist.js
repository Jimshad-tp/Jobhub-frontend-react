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
        console.log(apps, "hkhewprhqapirhpi3r");
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
    },
    {
      title: "Mobile",
      dataIndex: "phone",
    },
    ,
    {
      title: "status",
      dataIndex: "status",
      render:(text,record) => <h4 className="badge bg-primary">{record.status}</h4>

    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <span
              className="badge bg-success"
              onClick={() => changeFormStatus(record, "approved")}
            >
              Approve
            </span>
          )}
          {record.status === "approved" && (
            <span
              className="badge bg-danger"
              onClick={() => changeFormStatus(record, "blocked")}
            >
              Block
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
  );
}

export default Applicationlist;
