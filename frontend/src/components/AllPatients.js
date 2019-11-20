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
import { useTheme } from '@material-ui/core/styles';

function AllPatients({ past }) {
  const u_id = localStorage.getItem("u_id");
  const token = localStorage.getItem("token");
  const [patients, setPatients] = useState(null);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    // Update the document title using the browser API
    const url = past ? '/patients/past' : '/patients';
    axios.get(url,{
      params : {
        u_id,
        token
      }
    })
    .then((response) => {
      setPatients(JSON.parse(response.data));
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
      : <div
          style={{
            padding: theme.spacing(3)
          }}
        >
          {
            past
            ? <div>No patients reviewed yet.</div>
            : <div>No patients available.</div>
          }
        </div>
      }
    </Paper>
  );
}

export default AllPatients;
