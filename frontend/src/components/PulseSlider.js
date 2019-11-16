import React, {
  useState
} from 'react';
import {
  Grid,
  Input,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});


function PulseSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.suggested);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.setter(newValue);
  };

  const handleInputChange = event => {
    const newVal = (event.target.value === '') ? '' : Number(event.target.value)
    setValue(newVal);
    props.setter(newVal);
  };

  const handleBlur = () => {
    if (value < props.min) {
      setValue(props.min);
      props.setter(props.min);
    } else if (value > props.max) {
      setValue(props.max);
      props.setter(props.max);
    }
  };

  return (
    <div>
      <Typography variant="h5" color="inherited">
        {props.title}
      </Typography>
      <Typography align="left">
        {props.description}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {props.icon}
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : props.min}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: props.step,
              min: props.min,
              max: props.max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />{props.units}
        </Grid>
      </Grid>
    </div>
  );
}

export default PulseSlider;
