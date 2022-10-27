import { Card,Badge } from 'antd';
import React, { useState } from "react";
import {useSelector} from'react-redux'
import axios from "axios";
import {useEffect ,} from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Showform() {
    const [apps,setApps] = useState([])
 

const dispatch = useDispatch()
  const oneApplication = async () => {
    try {
      const response = await axios.post('/api/user/get-one-apps',{}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }       
      })
      dispatch(showLoading())
      if(response.data.success){
        toast.success(response.data.message)
        setApps(response.data.data)
          dispatch(hideLoading())
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("something went wrong");
    }
  }
console.log(apps,"hhdhftgsueitgps")

useEffect(() => { 
oneApplication()

}, [])


  return (
    <div className="site-card-border-less-wrapper ">
    <Card
      title=""
      bordered={true}
      style={{
        width: 300,
      }}
    >
      <p>{apps.name}</p>
      <p>{apps.address}</p>
      <p>{apps.city}</p>
      <p>{apps.state}</p>
      <p>{apps.phone}</p>
      <p>{apps.companyname}</p>
      <p>{apps.problem}</p>
      <p>{apps.uniqueSlution}</p>
      <Badge.Ribbon text={apps.status} color="magenta">
      <Card  size="small">

      </Card>
    </Badge.Ribbon>
    </Card>
  </div>
 
  );
}

export default Showform;