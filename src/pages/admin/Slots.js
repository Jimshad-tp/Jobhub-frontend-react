import React from "react";
import Layout from "../../Components/Layout";
import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

function Slots() {
  const [slot, setSlots] = useState([]);
  const dispatch = useDispatch();
  const addSlot = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/admin/slot", values);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getSlot = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/getslot", {});
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);

        setSlots([...response.data.data]);

      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.get('')

    } catch (error) {
      
    }
  }

  useEffect(() => {
    getSlot();
  }, []);

  return (
    <Layout>
      <div className="slotadd">
        <div className="slot-form card p-2">
          <h1 className="card-title">Add Slots</h1>
          <Form layout="verticall" onFinish={addSlot}>
            <Form.Item label="Section" name="section">
              <Input type="text" placeholder="section" />
            </Form.Item>
            <Form.Item label="Number" name="no">
              <Input placeholder="Number" type="Number" />
            </Form.Item>
            <Button className="primary-button" htmlType="submit">
              Choose
            </Button>
          </Form>
        </div>
      </div>

      <div className="slotadd">

        {slot.map((slot, index) => (
          <div className="slot-box" onClick={handleClick}>
            <div className="slot-form-card p-2">

              <tr>
                <h5 className="td">{slot.section}</h5>
                <h5 className="td justify-contant-center">{slot.no}</h5>
             </tr>

            </div>




          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Slots;
