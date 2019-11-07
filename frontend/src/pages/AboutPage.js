import React, {useState} from 'react';
import {ReactDOM} from 'react-dom';

import useStyles from '../components/Styles';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import AboutInfo from '../components/AboutInfo';

function AboutPage() {
  const doctor = true;
  const classes = useStyles();
	return (
    <ResponsiveDrawer doctor={doctor} child={<AboutInfo />}/>
  );
}

export default AboutPage;
