import React, {
	useState,
} from 'react';
import {Route} from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
	Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/Lock';
import axios from 'axios';

import useStyles from '../components/Styles';
import history from '../utils/history';

function LoginPage() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const classes = useStyles();

	function handleSubmit(event) {
		event.preventDefault();
		console.log("Email:\t" + email);
		console.log("Password:\t" + password);
		axios.post(`/auth`, {email, password})
		.then((response) => {
			console.log("worked");
			console.log(response);
			history.push('/patients');
		})
		.catch((err) => {
			console.log("noooo");
			console.log(err);
		});
		// axios.get(``)
	}

	return (
		<Container component="main" maxWidth="sm">
			<Box boxShadow={3} className={classes.card}>
				<Avatar>
					<LockOutlinedIcon color="action" />
				</Avatar>
				<Typography variant="h4">
					Log in
				</Typography>
				<Typography variant="overline">
					Welcome to pulse
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
					margin="normal"
					id="email"
					label="Email"
					name="email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
					fullWidth />
					<TextField
					margin="normal"
					id="password"
					label="Password"
					name="password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
					fullWidth />
					<Button
					margin="normal"
					type="submit"
					fullWidth
					color="primary"
					variant="contained"
					>
						Log in
					</Button>
					<Grid container direction="column" alignItems="center">
						<Grid item>
							<br />
							<Link href="/register">
								Register
							</Link>
						</Grid>
						<Grid item>
							<br />
							<Link href="/forgot-password">
								Reset password
							</Link>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
  );
}

export default LoginPage;
