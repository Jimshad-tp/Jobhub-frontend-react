import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../Components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Autherization: "Baerer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  return <Layout>

  </Layout>
}

export default Home;
