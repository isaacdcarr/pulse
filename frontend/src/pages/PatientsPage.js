import React from 'react';

import ResponsiveDrawer from '../components/ResponsiveDrawer';
import AllPatients from '../components/AllPatients';

function PatientsPage(props) {
	return (
    <ResponsiveDrawer child={<AllPatients past={false} />}/>
  );
}

export default PatientsPage;
