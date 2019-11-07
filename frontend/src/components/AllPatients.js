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

import useStyles from '../components/Styles';

function AllPatients() {
  const doctor = true;
  const [patients, setPatients] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    // Update the document title using the browser API
    axios.get(`http://localhost:5000/patients`,{
      params : {
        doctor
      }
    })
    .then((response) => {
      console.log("worked");
      setPatients(JSON.parse(response.data));
      console.log(response);
      console.log(patients);
    })
    .catch((err) => {
      console.log("noooo");
      console.log(err);
    });
  }, []);

  return (
    <Paper className={classes.root}>
      {patients != null
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
      }
    </Paper>
  );
}

export default AllPatients;
