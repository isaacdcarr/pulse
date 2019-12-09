import React, {
  useEffect,
  useState
} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import HelpIcon from '@material-ui/icons/Help';
import classes from '../components/Styles';
import { useTheme } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import PulseRadioGroup from '../components/PulseRadioGroup';
import { width } from '@material-ui/system';

function Profile(props) {
  var pics = [];
  const u_id = localStorage.getItem("u_id");
  const token = localStorage.getItem("token");
  const doctor = (localStorage.getItem("doctor") == "1");

  const [xrayLoading, isXrayLoading] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [heartRate, setHeartRate] = useState(null);
  const [oxySat, setOxySat] = useState(null);
  const [respRate, setRespRate] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [uploadBy, setUploadBy] = useState(null);
  const [reviewTime, setReviewTime] = useState(null);
  const [reviewBy, setReviewBy] = useState(null);
  const [chestXray, setChestXray] = useState("");
  const [seekHelp, setSeekHelp] = useState(null);
  const [pneuPresent, setPneuPresent] = useState(null);
  const [doctorNote, setDoctorNote] = useState(null);
  const [tmp, setTmp] = useState("");
  const [indrawing, setIndrawing] = useState(0);
  const [wheezing, setWheezing] = useState(0);
  const [crackling, setCrackling] = useState(0);
  const [diffBreath, setDiffBreath] = useState(0);
  const [fever, setFever] = useState(0);

  const [otis, setOtis] = useState(false);

  function tmpSet(val) {
    console.log(val);
    setTmp(val);
  }
  const theme = useTheme();


  useEffect(() => {
    console.log("Setting patients get request");
    axios.get(`/patients/${props.pid}`)
    .then((response) => {
      console.log(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setHeartRate(response.data.heartRate);
      setOxySat(response.data.oxySat);
      setRespRate(response.data.respRate);
      setUploadTime(response.data.uploadTime);
      setUploadBy(response.data.uploadBy);
      setReviewTime(response.data.reviewTime);
      setReviewBy(response.data.reviewBy);
      setDoctorNote(response.data.doctorNote);
      setSeekHelp(response.data.seekHelp);
      setPneuPresent(response.data.pneuPresent);
      setIndrawing(response.data.indrawing);
      setWheezing(response.data.wheezing);
      setCrackling(response.data.crackling);
      setDiffBreath(response.data.diffBreath);
      setFever(response.data.fever);
    })
    .catch((err) => {
      console.log(err);
    });

    console.log("Setting xrays get request");
    axios.get(`/xray/${props.pid}`,{
      params: { u_id, token }
    })
    .then((response) => {
      console.log(response.data);
      var img = new Image();
      var resp = response.data.xray;
      if (resp !== "") {
        img.src = 'data:' + response.data.imgType + ';base64,' + resp.substring(2, resp.length-1);
        setChestXray(img.src);
        console.log(response.data.otisDiagnosis);
        setOtis(response.data.otisDiagnosis === 1);
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
  }, []);

  function onDrop(picture) {
    let formData = new FormData();
    formData.append("chestXray",picture[0],picture[0].name);

    axios.post(`/xray/${props.pid}`, formData)
    .then((resp)=>{
      console.log(resp);
    })
    .catch((err)=> {
      console.log(err);
    });
  }

  function handleSubmit(event) {
    axios.post(`/patients/${props.pid}`,{
      pneuPresent, seekHelp, doctorNote, u_id
    })
    .then((response) => {
      console.log(pneuPresent);
      console.log(seekHelp);
      console.log(doctorNote);
      console.log("Mario it's a me");
      console.log(response.data);
      if (response.data.success === true) {

      } else {

      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Paper
    style={{
      minWidth: '95%',
      minHeight: 450
    }}>
      {firstName !== "" ?
      <div padding={2}>
        <br /><br />
        <Typography variant="h2">
          {firstName} {lastName}
        </Typography>
        <br /><br />
        <Grid
          container
          className={classes.root}
        >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              <Grid key="heartRate" item>
                <Paper style={{
                  backgroundColor: theme.palette.primary.light,
                  padding: theme.spacing(2)
                }}>
                  <Typography variant="overline">
                    Heart Rate
                  </Typography>
                  <Paper>
                    <Typography variant="subtitle2">
                      {heartRate}beats/min
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
              <Grid key="oxySat" item>
                <Paper style={{
                  backgroundColor: theme.palette.primary.light,
                  padding: theme.spacing(2)
                }}>
                  <Typography variant="overline">
                    Oxygen Saturation
                  </Typography>
                  <Paper>
                    <Typography variant="subtitle2">
                      {oxySat}%
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
              <Grid key="respRate" item>
                <Paper style={{
                  backgroundColor: theme.palette.primary.light,
                  padding: theme.spacing(2)
                }}>
                  <Typography variant="overline">
                    Respiration Rate
                  </Typography>
                  <Paper>
                    <Typography variant="subtitle2">
                      {respRate}breaths/min
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br /><br />
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <Paper style={{
                      padding: '5%',
                      backgroundColor: theme.palette.primary.light,
                      maxWidth: '80%'
          }}>
            <Typography variant="h5" color="inherited">
              Symptoms
            </Typography>
            <br /><br />
            <Grid container justify="center" spacing={3} >
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indrawing}
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
                        value="1"
                      />
                    }
                    label="Fever"
                  />
                </Paper>
              </Grid>
            </Grid>
            </Paper>
          </div>
        <br /><br />
        {chestXray === "" ?
          <div>
            <Typography>
              No chest x-ray available. Would you like to upload one?
            </Typography>
            <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={onDrop}
              imgExtension={['.jpg', '.png', '.jpeg']}
              maxFileSize={5242880}
              label="Max file size: 5mb, accepted: jpg, png"
            />
          </div>
          :
          <div style={{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
          <Paper id="xrayContainer" style={{
            backgroundColor: theme.palette.primary.light,
            minWidth: '60%',
            maxWidth: '80%',
            padding: '5%',
          }}>
            {xrayLoading && <CircularProgress />}
            <img
              alt="Chest X-ray"
              src={chestXray}
              style={{
                maxWidth: '100%'
              }}
            />
            <br /><br />
            <code>otis</code>'s pneumonia diagnosis:
            <br /><br />
            <Paper>
              <Typography variant="h6">
              {otis ? "Pneumonia detected" : "Pneumonia not detected"}
              </Typography>
            </Paper>

          </Paper>
          </div>
        }
        <Table style={{
          maxWidth: '90%',
          margin: '5%'
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Uploaded by</TableCell>
              <TableCell>Upload time</TableCell>
              <TableCell>Reviewed by</TableCell>
              <TableCell>Review time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{uploadBy}</TableCell>
              <TableCell>{uploadTime}</TableCell>
              <TableCell>
                {
                  reviewBy !== ""
                  ? <div>{reviewBy}</div>
                  : <div>Not yet reviewed</div>
                }
              </TableCell>
              <TableCell>
                {
                  reviewBy !== ""
                  ? <div>{reviewTime}</div>
                  :<div>Not yet reviewed</div>
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      :
      <Typography>
        No data available
      </Typography>
      }
      <Paper style={{
        maxWidth: '90%',
        margin: '10%',
        padding: '5%',
        backgroundColor: '#e3f2fd'
      }}>
        <Typography variant="h5">
          Doctor's recommendation
        </Typography>
        <form onSubmit={handleSubmit}>
          <PulseRadioGroup
            parentSet={setPneuPresent}
            parentVal={pneuPresent}
            legend="From the data presented, do you believe that the patient has pneumonia?"
            options={{
              'yes' : 'Yes, the patient has pneumonia',
              'no' : 'No, the patient does not have pneumonia',
              'unsure' : 'Cannot provide diagnosis from available data'
            }}
            disabled={!doctor}
          />
          <PulseRadioGroup
            parentSet={setSeekHelp}
            parentVal={seekHelp}
            legend="From the data presented, do you believe that the patient should go to hospital or seek further attention?"
            options={{
              'yes' : 'Yes, the patient needs help',
              'no' : "No, I believe the patient's condition is not severe",
              'unsure' : 'Cannot provide recommendation from available data'
            }}
            disabled={!doctor}
          />
          <br /><br />
          <Paper style={{padding: '5%'}}>
            <FormLabel component="legend">
              Please specify any relevant or extra information that would benefit the health facilitator.
            </FormLabel>
            <TextField
              margin="normal"
              value={doctorNote}
              onChange={val=>setDoctorNote(val.target.value)}
              id="doctorNote"
              label="Doctor note"
              name="doctorNote"
              type="doctorNote"
              InputLabelProps={doctorNote ? {shrink: true} : ""}
              required
              fullWidth
              disabled={!doctor}
            />
          </Paper>
          <br /><br />
          <Button
					margin="normal"
					type="submit"
					fullWidth
					color="primary"
          variant="contained"
          style={{
            maxWidth: '50%',
          }}
					>
						Submit diagnosis
					</Button>
        </form>
      </Paper>

    </Paper>
  )
}

function PatientProfilePage({match}) {
  return (
    <>
      <ResponsiveDrawer child={<Profile pid={match.params.pid}/>} />
    </>
  );
}

export default PatientProfilePage;
