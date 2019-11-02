import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
  Avatar,
  Box,
  Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
  Grid,
  Link,
	Radio,
	RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import {
	CountryDropdown,
	RegionDropdown,
} from 'react-country-region-selector-material-ui-new';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import useStyles from '../components/Styles';
import DoctorForm from '../components/DoctorForm';
import HFForm from '../components/HFForm';

function RegisterPage() {

	const [doctor, setDoctor] = useState(null);
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");

	const classes = useStyles();

	function handleSubmit(event) {
		// event.preventDefault();

		// if ()
	}

	return (
		<Container component="main" maxWidth="sm">
			<Box boxShadow={3} className={classes.card}>
				<Avatar>
					<HowToRegIcon color="primary" />
				</Avatar>
				<Typography variant="h4">
					Register
				</Typography>
				<Typography variant="overline">
					Welcome to pulse
				</Typography>
				<form onSubmit={handleSubmit}>
					<br />
					<FormControl component="fieldset" className={classes.formControl}>
						<FormLabel component="legend">Are you a Doctor or a Health Facilitator?</FormLabel>
						<RadioGroup aria-label="DoctorHF" name="DoctorHF" onChange={(val) => setDoctor(val.target.value == 'true')}>
							<FormControlLabel value="true" control={<Radio />} label="Doctor" />
							<FormControlLabel value="false" control={<Radio />} label="Health Facilitator" />
						</RadioGroup>
					</FormControl>
					<br /><br />
					<Typography variant="h5">
						Basic details
					</Typography>
					<TextField
					margin="normal"
					id="first_name"
					label="First name"
					name="first_name"
					type="text"
					required
					fullWidth />
					<TextField
					margin="normal"
					id="last_name"
					label="Last name"
					name="last_name"
					type="text"
					required
					fullWidth />
					<TextField
					margin="normal"
					id="email"
					label="Email"
					name="email"
					type="email"
					required
					fullWidth />
					<TextField
					margin="normal"
					id="password"
					label="Enter a password"
					name="password"
					type="password"
					required
					fullWidth />
					<TextField
					margin="normal"
					id="repeat_password"
					label="Enter password again"
					name="repeat_password"
					type="repeat_password"
					required
					fullWidth />

					<br /><br />
					<Typography variant="h5">
						Where are you from?
					</Typography>
					<CountryDropdown
					fullWidth
					required
					value={country}
					onChange={(val) => setCountry(val)}/>
					<RegionDropdown
					fullWidth
					required
					country={country}
					value={region}
					onChange={(val) => setRegion(val)}/>
					<br /><br />
					{ doctor == null ? null
					: doctor ? <DoctorForm /> : <HFForm />
					}
					{/* <div id="myForm"></div> */}
					<Button
					margin="normal"
					type="submit"
					fullWidth
					color="primary"
					variant="contained"
					>
						Register
					</Button>
					<Grid container direction="column" alignItems="center">
						<Grid item>
							<br />
							<Link href="/login">
								Already have an account?
								<br />
								Log in
							</Link>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
  );
}

export default RegisterPage;
