import React from 'react';
import {
  Avatar,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';

import useStyles from '../components/Styles';
import profilePic from '../static/img/profile.jpg';

function AboutInfo() {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              About Pulse
            </Typography>
            <Typography variant="subtitle1" color="inherit" align="justify" paragraph >
              <code style={{
                color: '#f44336',
                borderRadius: '3px',
              }}>pulse</code> operates as a subsystem within a overall system that aims to provide remote pneumonia diagnosis to patients in sub-Saharan Africa.
            </Typography>
            <Typography variant="subtitle1" color="inherit" align="justify" paragraph >
              As the number 1 killer in the developing world, it was found that pneumonia can be adequately treated if it diagnosed early enough and the patient is able to get to the hospital. It was also discovered that the first source of health care a patient receives is usually at a "health post". These are places that provide basic health care such as first aid and immunization at locations such as school medical centres.
            </Typography>
            <Typography variant="subtitle1" color="inherit" align="justify" paragraph >
              The main issue is that the signs and symptoms of pneumonia vary, so it is hard to diagnose. The overall aim is to quickly and accurately identify pneumonia, so that a patient can receive the treatment they need. Our solution involves deploying a device with a PPG sensor that supplements the equipment currently available at health posts, to send a patient's data to a remote Doctor. This Doctor can then either diagnose the patient with pneumonia or provide a recommended action.
            </Typography>
            <Typography variant="subtitle1" color="inherit" align="justify" paragraph >
              This project was designed, built and tested by <Link target="_blank" href="https://linkedin.com/in/isaacdcarr">Isaac Carr</Link>.
            </Typography>
            <Grid container justify="center" alignItems="center">
              <Link target="_blank" href="https://linkedin.com/in/isaacdcarr">
                <Avatar src={profilePic} style={{width: '150px', height: '150px'}} />
              </Link>
            </Grid>
          </div>
        </Grid>
      </Grid>

    </Paper>
  );
}

export default AboutInfo;
