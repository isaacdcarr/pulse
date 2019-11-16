import React from "react";
import { Redirect } from "react-router-dom";

function IndexPage(props) {
  const token = localStorage.getItem("token");
  return (
    <div>
      {token !== null
      ? <Redirect to="/patients" />
      : <Redirect to="/login" />
      }
    </div>
  );
}

export default IndexPage;
