import React, {
	useState
} from 'react';

import {
  TextField,
  Typography,
} from '@material-ui/core';

function HFForm({
	parentRI,
	parentRT,
	parentNP,
}) {
	const [roleTitle, setRoleTitle] = useState("");
	const [roleInstitution, setRoleInstitution] = useState("");
	const [numPatients, setNumPatients] = useState(0);

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
			value={roleTitle}
			onChange={val=> {
				setRoleTitle(val.target.value);
				parentRT(val.target.value);
			}}
			required
			fullWidth />
			<TextField
			margin="normal"
			id="role-instituion"
			label="Work place"
			name="role-instituion"
			type="text"
			value={roleInstitution}
			onChange={val=>{
				setRoleInstitution(val.target.value);
				parentRI(val.target.value);
			}}
			required
			fullWidth />
			<br /><br />
			<Typography variant="h5">
				How many patients are in your care?
			</Typography>
			<TextField
			margin="normal"
			id="num-patients"
			label="Number of patients"
			name="num-patients"
			type="number"
			value={numPatients}
			onChange={(val) => {
				setNumPatients(val.target.value);
				parentNP(val.target.value);
			}}
			inputProps={{min: "0", max: "5000", step: "10"}}
			required
			fullWidth />
		</div>
	);
}

export default HFForm;
