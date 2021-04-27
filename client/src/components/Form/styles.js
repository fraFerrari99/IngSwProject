import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  mainContainer: {
    marginLeft: '25%',
  },
  center: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#3f51b5',
    color: 'rgb(255,255,255)',
    '&:hover': {
      background: '#6495ED',
    },
    marginTop: '5px',
    marginLeft: '2px', 
    marginRight: '2px',
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  buttonSecondary: {
    backgroundColor: '#f50057',
    color: 'rgb(255,255,255)',
    '&:hover': {
      background: '#FF7F50',
    }
  },
  footerMargin: {
    marginLeft: '5px',
    marginRight: '5px',
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    padding: '0px 0px 0px 0px',
    height: '58px',
    width: '44px',
    margin: '10px 0 0 10px',
  },
  mainGrid: {
    verticalAlign: 'middle',
    display: 'inline-flex'
},
}));