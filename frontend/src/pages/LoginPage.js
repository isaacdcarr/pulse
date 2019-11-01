import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.primary.light,
    },
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(8),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
		alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
	},
	locked: {
		color: theme.palette.primary,
	}
}));


function LoginPage() {

	function handleSubmit(event) {

	}

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<Box boxShadow={3} className={classes.card}>
				<Avatar>
					<LockOutlinedIcon filled color="action" />
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
					required
					fullWidth />
					<TextField
					margin="normal"
					id="password"
					label="Password"
					name="password"
					type="password"
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
