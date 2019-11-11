import React from 'react';

import ResponsiveDrawer from '../components/ResponsiveDrawer';
import AboutInfo from '../components/AboutInfo';

function AboutPage() {
  const doctor = true;
	return (
    <ResponsiveDrawer doctor={doctor} child={<AboutInfo />}/>
  );
}

export default AboutPage;
