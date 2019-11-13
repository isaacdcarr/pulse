import React from 'react';

import ResponsiveDrawer from '../components/ResponsiveDrawer';
import AllPatients from '../components/AllPatients';

function PastPatientsPage(props) {
	return (
    <ResponsiveDrawer child={<AllPatients past={true} />}/>
  );
}

export default PastPatientsPage;
