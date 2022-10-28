import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function Example() {
  const [show, setShow] = useState(false);
  const [slot, setSlots] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getSlot = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/getslot", {});
      dispatch(hideLoading());
      if (response.data.success) {
        setSlots(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getSlot();
  }, []);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Index</th>
          <th>Slot</th>
          <th>Slot status</th>
          <th>Booked Slot</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {slot.map((slot, index) => {
          <tr>
            <td>{slot.section}</td>
            <td>y8t8t</td>
            <td>gxhdf</td>
            <td>sds</td>
            <td>
              <>
                <Button variant="primary" onClick={handleShow}>
                  Book Slot
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Book Slot</Modal.Title>
                  </Modal.Header>
                  {slot?.map((slot, index) => {
                    <Modal.Body>{slot?.section}</Modal.Body>;
                  })}
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </td>
          </tr>;
        })}
      </tbody>
    </Table>
  );
}

export default Example;
