import React, {useState} from 'react';
// import {
// } from '@material-ui/core';
// import axios from 'axios';

import ResponsiveDrawer from '../components/ResponsiveDrawer';
import AllPatients from '../components/AllPatients';

function PatientsPage(props) {
  const doctor = localStorage.getItem("doctor");

  const child = doctor
    ? <AllPatients />
    : <div>not doctor</div>;
	return (
    <ResponsiveDrawer doctor={doctor} child={child}/>
  );
}

export default PatientsPage;
