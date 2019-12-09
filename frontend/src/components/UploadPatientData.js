import React, {
  useState,
} from 'react';
import {
  Redirect
} from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
  Modal,
  makeStyles,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SyncIcon from '@material-ui/icons/Sync';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HelpIcon from '@material-ui/icons/Help';
import ImageUploader from 'react-images-upload';
import PulseSlider from '../components/PulseSlider';
import Axios from 'axios';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


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
  const [hfNote, setHfNote] = useState("");
  const [xray, setXray] = useState(null);

  const [showXrayHelp, setXrayShowHelp] = useState(false);
  const [showSymptomHelp, setSymptomShowHelp] = useState(false);
  const [newId, setNewId] = useState(-1);
  const [xrayName, setXrayName] = useState("");

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [redir, setResdir] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post(`/patients/new`, {
      firstName, lastName, heartRate, oxySat, respRate, xray, u_id,
      indrawing, wheezing, crackling, diffBreath, fever
    })
    .then((response) =>{
      console.log(response.data);
      if (response.data.success === true) {
        setNewId(response.data.newId);
        setOpen(true);
      } else {
        console.log("ERROR IN POST")
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  async function handleUpload(event) {
    event.preventDefault();
    console.log(xray);
    console.log(xrayName)
    setIsLoading(true);
    if (xray !== null) {
      let formData = new FormData();
      formData.append("chestXray",xray,xrayName);
      try {
        var resp = await Axios.post(`/xray/${newId}`, formData);
        console.log("Here: " + resp);
      } catch (e) {
        console.log(e)
      }
    }
    setIsLoading(false);
    setResdir(true);
  }

  function onDrop(picture) {
    console.log(picture);
    setXray(picture[0]);
    setXrayName(picture[0].name)
    var reader = new FileReader();
    reader.onloadend = function() {
      var dataURL = reader.result;
      var img = new Image();
      img.src = dataURL;
      img.width = 320;
      document.getElementById('xray').appendChild(img);
    };
    reader.readAsDataURL(picture[0]);
  }

  function handleSymptomHelp(event) {
    setSymptomShowHelp(true ^ showSymptomHelp);
  }

  function handleXrayHelp(event) {
    setXrayShowHelp(true ^ showXrayHelp);
  }

  if (redir) {
    console.log("Hree");
    const toRedirect = "/patients/" + newId;
    return <Redirect to={toRedirect} />;
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
                <Paper >
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
                <Paper>
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
                <Paper>
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
                <Paper >
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
                <Paper>
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
            fullWidth
          />
          <br /><br />
          <Button
            margin="normal"
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
          >
						Upload new patient
					</Button>
        </form>
      </Paper>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
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
          <div width="100%" id="xray"></div>
          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={onDrop}
            imgExtension={['.jpg', '.jpeg', '.png']}
            maxFileSize={5242880}
          />
          {isLoading && <CircularProgress />}
          <Button
            margin="normal"
            fullWidthth
            color="primary"
            variant="contained"
            onClick={handleUpload}
          >
						Upload new patient!
					</Button>
        </div>
      </Modal>
    </div>
  );
}

export default UploadPatientData;
