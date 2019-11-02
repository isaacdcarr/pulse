import React from 'react';

import {
  TextField,
  Typography,
} from '@material-ui/core';

function HFForm() {
	return (
		<div>
			<br /><br />
			<Typography variant="h5">
				What is your role?
			</Typography>
			<TextField
			margin="normal"
			id="role-title"
			label="Role title"
			name="role-title"
			type="text"
			required
			fullWidth />
			<TextField
			margin="normal"
			id="role-instituion"
			label="Work place"
			name="role-instituion"
			type="text"
			required
			fullWidth />
			<TextField
			margin="normal"
			id="degree-city"
			label="City"
			name="degree-city"
			type="text"
			required
			fullWidth />
		</div>
	);
}

export default HFForm;
