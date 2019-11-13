import {makeStyles} from '@material-ui/core';

const drawerWidth = 240;

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
    minWidth: 450,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    alignSelf: 'stretch',
    width: '100%',
    overflowX: 'auto',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
  },
  second : {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default useStyles;
