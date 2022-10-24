
import React from "react";
import { Form, Input, Button} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Login() {
  const navigate = useNavigate()
  const onFinish = async (values) => {
   console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaai");
    try {
      const response = await axios.post("/api/user/login", values);
    
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.data)
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
              
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
 

  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Login</h1>
        <Form layout="vertical" onFinish={onFinish}>
     
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
            </Form.Item>
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
          <Link to="/register" className="anchor">
           
            create a new account!
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
