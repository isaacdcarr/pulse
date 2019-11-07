import React, {
	useState
} from 'react';

import {
  TextField,
  Typography,
} from '@material-ui/core';


function DoctorForm({
	parentDT,
	parentDI,
	parentRT,
	parentRI,
}) {
	const [degreeTitle, setDegreeTitle] = useState("");
	const [degreeInstitution, setDegreeInstitution] = useState("");
	const [roleTitle, setRoleTitle] = useState("");
	const [roleInstitution, setRoleInstitution] = useState("");

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
			value={degreeTitle}
			onChange={(val)=> {
				setDegreeTitle(val.target.value);
				parentDT(val.target.value);
			}}
			required
			fullWidth />
			<TextField
			margin="normal"
			id="degree-instituion"
			label="Institution"
			name="degree-instituion"
			type="text"
			value={degreeInstitution}
			onChange={val=>{
				setDegreeInstitution(val.target.value);
				parentDI(val.target.value);
			}}
			required
			fullWidth />
			<br /><br />
			<Typography variant="h5">
				Current work
			</Typography>
			<TextField
			margin="normal"
			id="role-title"
			label="Role title"
			name="role-title"
			type="text"
			value={roleTitle}
			onChange={val=>{
				setRoleTitle(val.target.value);
				parentRT(val.target.value);
			}}
			required
			fullWidth />
			<TextField
			margin="normal"
			id="role-instituion"
			label="Work place"
			name="role-institution"
			type="text"
			value={roleInstitution}
			onChange={val=>{
				setRoleInstitution(val.target.value);
				parentRI(val.target.value);
			}}
			required
			fullWidth />
		</div>
	);
}

export default DoctorForm;
