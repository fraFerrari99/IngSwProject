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
  form: {
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
  }
}));