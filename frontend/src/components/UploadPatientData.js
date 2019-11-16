import React, {
  useState,
} from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SyncIcon from '@material-ui/icons/Sync';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HelpIcon from '@material-ui/icons/Help';
import ImageUploader from 'react-images-upload';
import useStyles from './Styles';
import PulseSlider from '../components/PulseSlider';
import Axios from 'axios';

function UploadPatientData(props) {
  const classes = useStyles();
  const theme = useTheme();

  const u_id = localStorage.getItem('u_id');

  const osSuggested = 95.00;
  const hrSuggested = 80;
  const rrSuggested = 40;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [heartRate, setHeartRate] = useState(hrSuggested);
  const [oxySat, setOxySat] = useState(osSuggested);
  const [respRate, setRespRate] = useState(rrSuggested);
  const [indrawing, setIndrawing] = useState(0);
  const [wheezing, setWheezing] = useState(0);
  const [crackling, setCrackling] = useState(0);
  const [diffBreath, setDiffBreath] = useState(0);
  const [fever, setFever] = useState(0);
  const [hfNote, setHfNote] = useState();
  const [xray, setXray] = useState();

  const [showXrayHelp, setXrayShowHelp] = useState(false);
  const [showSymptomHelp, setSymptomShowHelp] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("FirstName: " + firstName);
    console.log("LasttName: " + lastName);
    console.log("OS: " + oxySat);
    console.log("HR: " + heartRate);
    console.log("RR: " + respRate);
    Axios.post(`/patients/new`, {
      firstName, lastName, heartRate, oxySat, respRate, xray, u_id,
      indrawing, wheezing, crackling, diffBreath, fever
    })
    .then((response) =>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  function onDrop(picture) {
    setXray(picture);
  }

  function handleSymptomHelp(event) {
    setSymptomShowHelp(true ^ showSymptomHelp);
  }

  function handleXrayHelp(event) {
    setXrayShowHelp(true ^ showXrayHelp);
  }

  return (
    <div>
      <Paper style={{
        padding: '5%',
        minWidth: '90%'
      }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3">
            Upload a new patient's data
          </Typography>
          <br /><br />
          <TextField
            margin="normal"
            id="firstName"
            label="Patient's first name"
            name="firstName"
            type="text"
            value={firstName}
            onChange={event=>setFirstName(event.target.value)}
            required
            fullWidth
          />
          <TextField
            margin="normal"
            id="lastName"
            label="Patient's last name"
            name="lastName"
            type="text"
            value={lastName}
            onChange={event=>setLastName(event.target.value)}
            required
            fullWidth
          />
          <br /><br />
          <PulseSlider
            title="Heart Rate"
            description="Please enter the patient's heart rate"
            min={20}
            max={200}
            step={5}
            suggested={hrSuggested}
            units={"beats/min"}
            icon={<FavoriteIcon />}
            value={heartRate}
            setter={setHeartRate}
          />
          <br /><br />
          <PulseSlider
            title="Oxygen Saturation"
            description="Please enter the patient's oxygen saturation"
            min={0}
            max={100}
            step={0.01}
            suggested={osSuggested}
            units={"%"}
            icon={<AllInclusiveIcon />}
            value={oxySat}
            setter={setOxySat}
          />
          <br /><br />
          <PulseSlider
            title="Respiratory (breathing) Rate"
            description="Please enter the patient's breathing rate"
            min={0}
            max={80}
            step={5}
            suggested={rrSuggested}
            units={"breaths/min"}
            icon={<SyncIcon />}
            value={respRate}
            setter={setRespRate}
          />
          <br /><br />
          <Typography variant="h5" color="inherited">
            Symptoms <HelpIcon onClick={handleSymptomHelp}/>
          </Typography>
          <br />
          {showSymptomHelp
          ?
          <>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Paper
                id="help-xray"
                style={{
                  padding: '5%',
                  maxWidth: '400px',
                  backgroundColor: theme.palette.primary.light,
                }}
              >
                <Typography align="justify">
                  Please check any symptoms your patient is presenting. If your patient is displaying something
                  not in the list, please note in the following section.
                </Typography>
              </Paper>
            </div>
            <br /><br />
          </>
          : null}

          <Paper style={{
                    padding: '5%',
                    backgroundColor: theme.palette.primary.light
          }}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indrawing}
                        onChange={(event)=>setIndrawing(event.target.checked ? 1 : 0)}
                        value="1"
                      />
                    }
                    label="Chest indrawing"
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={wheezing}
                        onChange={(event)=>setWheezing(event.target.checked ? 1 : 0)}
                        value="1"
                      />
                    }
                    label="Wheezing"
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={crackling}
                        onChange={(event)=>setCrackling(event.target.checked ? 1 : 0)}
                        value="1"
                      />
                    }
                    label="Crackling within chest"
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={diffBreath}
                        onChange={(event)=>setDiffBreath(event.target.checked ? 1 : 0)}
                        value="1"
                      />
                    }
                    label="Difficulty breathing"
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fever}
                        onChange={(event)=>setFever(event.target.checked ? 1 : 0)}
                        value="1"
                      />
                    }
                    label="Fever"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
          <br /><br />
          <TextField
            margin="normal"
            id="hfNote"
            label="Is there anything else the Doctor should know? Other symptoms?"
            name="hfNote"
            type="text"
            value={hfNote}
            onChange={event=>setHfNote(event.target.value)}
            required
            fullWidth
          />
          <br /><br />
          <Typography variant="h5" color="inherited">
            Chest X-ray <HelpIcon onClick={handleXrayHelp}/>
          </Typography>
          <br />
          {showXrayHelp
          ?
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Paper
              id="help-xray"
              style={{
                padding: '5%',
                maxWidth: '400px',
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <Typography align="justify">
                If the patient has been to a <code>Pulse</code>, then there is an opportunity to make use of <code>Otis</code>.
                <code>Otis</code> is an AI that has been trained on 31 000 chest x-rays to predict if someone has pneumonia.
                This recommendation will be utilised by the Doctor reviewing the patient.
              </Typography>
            </Paper>
          </div>
          : null}
          <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={onDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
            />
          <br /><br />
          <Button
            margin="normal"
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
          >
						Upload new patient!
					</Button>
        </form>
      </Paper>
    </div>
  );
}

export default UploadPatientData;
