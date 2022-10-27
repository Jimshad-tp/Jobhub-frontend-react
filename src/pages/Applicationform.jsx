import toast from "react-hot-toast";
import React from "react";
import Layout from "../Components/Layout";
import "../layout.css";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";


function Applicationform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/form", values);
      dispatch(hideLoading());

      if (response.data.success) {

        toast.success(response.data.message);
    
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="application">
        <div className="application-form card p-2">
          <h1 className="card-title">Application Form</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" type="text" />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder="Address" type="type" />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="City" type="text" />
            </Form.Item>
            <Form.Item label="State" name="state">
              <Input placeholder="State" type="text" />
            </Form.Item>
            <Form.Item label="Mobile" name="phone">
              <Input placeholder="Mobile" type="number" />
            </Form.Item>
            <Form.Item label="Company name" name="companyname">
              <Input placeholder="Company name" type="text" />
            </Form.Item>
            <Form.Item label="Problem" name="problem">
              <Input placeholder="Problem" type="text" />
            </Form.Item>
            <Form.Item label="Uniqe about solution" name="uniqueSolution">
              <Input placeholder="Unique Solution" type="text" />
            </Form.Item>

            <Button className="primary-button" htmlType="submit">
              SUBMIT
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default Applicationform;
