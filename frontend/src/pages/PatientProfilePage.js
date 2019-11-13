import React, {
  useEffect,
  useState
} from 'react';
import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Typography,
  TableBody,
} from '@material-ui/core';
import axios from 'axios';
import classes from '../components/Styles';
import { useTheme } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import ResponsiveDrawer from '../components/ResponsiveDrawer'

function Profile(props) {
  const u_id = localStorage.getItem("u_id");
  const token = localStorage.getItem("token");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [heartRate, setHeartRate] = useState(null);
  const [oxySat, setOxySat] = useState(null);
  const [respRate, setRespRate] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [uploadBy, setUploadBy] = useState(null);
  const [reviewTime, setReviewTime] = useState(null);
  const [reviewBy, setReviewBy] = useState(null);
  const [chestXray, setChestXray] = useState(null);
  const [seekHelp, setSeekHelp] = useState(null);
  const [pneuPresent, setPneuPresent] = useState(null);
  const [doctorNote, setDoctorNote] = useState(null);

  const theme = useTheme();


  useEffect(() => {
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

      // chest xray formating
      // console.log(response.data.chestXray.substring(2))
      // if (response.data.chestXray !== '') {
      //   var encodedResponse = arrayBufferToBase64(response.data.chestXray);
      //   var img = new Image();
      //   var cont = document.getElementById('xrayContainer');
      //   img.src = 'data:image/png;base64,' + response.data.chestXray;//encodedResponse;
      //   console.log(img.src);
      //   cont.appendChild(img);
      //   setChestXray(img.src);
      // } else {
      //   setChestXray("");
      //   console.log("No image");
      // }

    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`/xray/${props.pid}`,{
      params: {
        u_id,
        token
      }
    })
    .then((response) => {
        var img = new Image();
        var resp = response.data.xray;
        var cont = document.getElementById('xrayContainer');
        img.src = 'data:image/png;base64,' + resp.substring(2, resp.length-1);//encodedResponse;
        console.log("Start: " + resp.substring(0,5));
        console.log("End: " + resp.substring(resp.length - 5, resp.length-1));
        cont.appendChild(img);
        setChestXray(img.src);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
  }, []);

  function onDrop(picture) {
    setChestXray(picture);
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
          className={classes.root}s
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
        {chestXray === "" ?
          <div>
            <Typography>
              No chest x-ray available. Would you like to upload one?
            </Typography>
            <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={onDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
            />
          </div>
          :
          <div id="xrayContainer"></div>
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
