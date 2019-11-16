import React from 'react';

import ResponsiveDrawer from '../components/ResponsiveDrawer';
import UploadPatientData from '../components/UploadPatientData';

function UploadPatientPage(props) {
	return (
    <ResponsiveDrawer child={<UploadPatientData />}/>
  );
}

export default UploadPatientPage;
