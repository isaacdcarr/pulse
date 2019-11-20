import React, {
  useState
} from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from '@material-ui/core';

function PulseRadioGroup(props) {
  function handleChange(event) {
    props.parentSet(event.target.value);
  }

  return(
    <div>
      <br /><br />
      <Paper style={{
        padding: '5%'
      }}>
        <FormControl component="fieldset" style={{minWidth: '100%'}}>
          <FormLabel component="legend">
            {props.legend}
          </FormLabel>
          <RadioGroup aria-label="gender" name="gender1"  onChange={handleChange}>
            {Object.keys(props.options).map((key) =>
              <FormControlLabel
                value={key}
                control={<Radio />}
                label={props.options[key]}
                checked={props.parentVal === key}
                disabled={props.disabled}
              />
            )}
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
}

export default PulseRadioGroup;
