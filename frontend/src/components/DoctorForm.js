import React, {
	useState
} from 'react';

import {
  TextField,
  Typography,
} from '@material-ui/core';


function DoctorForm() {
    return (
			<div>
				<br /><br />
				<Typography variant="h5">
					Qualification
				</Typography>
				<TextField
				margin="normal"
				id="degree-title"
				label="Degree title"
				name="degree-title"
				type="text"
				required
				fullWidth />
				<TextField
				margin="normal"
				id="degree-instituion"
				label="Institution"
				name="degree-instituion"
				type="text"
				required
				fullWidth />
			</div>
    );
}

export default DoctorForm;
