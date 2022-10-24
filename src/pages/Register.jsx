import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/register", values);
      console.log(response.data.success)
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
              
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Register</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          {/* <Form.Item label="Confirm Password" name="confirmPassword">
            <Input placeholder="Confirm Password" type="password" />
          </Form.Item> */}
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
          <Link to="/login" className="anchor">
            I have an account?
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
