import React, {
	useState,
	useEffect,
} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
	Paper,
  TextField,
	Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/Lock';
import axios from 'axios';

import useStyles from '../components/Styles';
import { useAuth } from '../utils/auth';

function LoginPage(props) {
	const [loggedIn, setLoggedin] = useState(false);
	const [err, setErr] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();

	const classes = useStyles();

	useEffect(() => {
		console.log(props);
		if (props.location.email) {
			setEmail(props.location.email['email']);
		}
		if (props.location.password) {
			setPassword(props.location.password['password']);
		}
	},[]);

	function handleSubmit(event) {
		event.preventDefault();

		axios.post(`/auth`, {email, password})
		.then((response) => {
			if (response.status === 200) {
				setAuthTokens(response.data.u_id, response.data.doctor, response.data.token);
				setLoggedin(true);
			} else {
				setErr(true);
			}
		})
		.catch((err) => {
			setErr(true);
		});
	}

	if (loggedIn) {
		return <Redirect to="/patients" />;
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
				{err &&
				<Paper
				style={{
					color: '#ffebee',
					padding: '2%',
					backgroundColor: '#f44336' }}>
					<Typography
						>
						Invalid username and password combination
					</Typography>
				</Paper>}
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
							<Link to="/register">
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
