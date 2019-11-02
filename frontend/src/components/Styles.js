import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.primary.light,
      },
    },
    card: {
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(8),
      padding: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      minWidth: 400,
    }
  }));

  export default useStyles;
