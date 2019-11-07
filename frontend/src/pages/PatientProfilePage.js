import React, {
  useEffect,
  useState
} from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';

import ResponsiveDrawer from '../components/ResponsiveDrawer'

function Profile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  useEffect(() => {
    axios.get(`/patients/${props.pid}`)
    .then((response) => {
      console.log(response);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <Paper>
      {/* // className={classes.root}> */}
      {/* {firstName !== ""
      ? <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Upload Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {patients.map((row) => (
            <TableRow>
              <TableCell component="a" href={'/patients/'+ row.id}>
                Profile
              </TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.uploadTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      : <div>No patients available</div>
      } */}
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
