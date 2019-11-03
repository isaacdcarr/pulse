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
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import useStyles from '../components/Styles';
import DoctorForm from '../components/DoctorForm';
import HFForm from '../components/HFForm';

function RegisterPage() {

	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [doctor, setDoctor] = useState(null);
	const [phone, setPhone] = useState("");
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");
	const [city, setCity] = useState("");

	const classes = useStyles();

	function handleSubmit(event) {

		if (doctor === null) {
			alert("Please specify if you are a Doctor or a Health Facilitator");
			return;
		}
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
					value={firstName}
					onChange={val=>setFirstName(val.target.value)}
					required
					fullWidth />
					<TextField
					margin="normal"
					id="last_name"
					label="Last name"
					name="last_name"
					type="text"
					value={lastName}
					onChange={val=>setLastName(val.target.value)}
					required
					fullWidth />
					<TextField
					margin="normal"
					id="email"
					label="Email"
					name="email"
					type="email"
					value={email}
					onChange={val=>setEmail(val.target.value)}
					required
					fullWidth />
					<br /><br />
					<PhoneInput
					placeholder="Phone"
					value={phone}
					onChange={val=>setPhone(val.target.value)}
					/>
					<TextField
					margin="normal"
					id="password"
					label="Enter a password"
					name="password"
					type="password"
					value={password}
					onChange={val=>setPassword(val.target.value)}
					required
					fullWidth />
					<TextField
					margin="normal"
					id="repeat_password"
					label="Enter password again"
					name="repeat_password"
					type="repeat_password"
					value={repeatPassword}
					onChange={val=>setRepeatPassword(val.target.value)}
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
					<br /><br />
					<RegionDropdown
					fullWidth
					required
					country={country}
					value={region}
					onChange={(val) => setRegion(val)}/>
					<TextField
					margin="normal"
					id="city"
					label="City/Town"
					name="city"
					type="text"
					value={city}
					onChange={val=>setCity(val.target.value)}
					required
					fullWidth />

					<br /><br />
					<Typography variant="h5">
						Are you a Doctor or a Health Facilitator?
					</Typography>
					<FormControl component="fieldset" className={classes.formControl}>
						<FormLabel component="legend"></FormLabel>
						<RadioGroup aria-label="DoctorHF" name="DoctorHF" onChange={(val) => setDoctor(val.target.value == 'true')}>
							<FormControlLabel value="true" control={<Radio />} label="Doctor" />
							<FormControlLabel value="false" control={<Radio />} label="Health Facilitator" />
						</RadioGroup>
					</FormControl>

					<br /><br />
					{ doctor === null ? null
					: doctor ? <DoctorForm /> : <HFForm />
					}

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
