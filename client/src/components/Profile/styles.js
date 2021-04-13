import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '180px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  //only in non-mobile devices
  cardMarginRight: {
    marginRight: '30%',
  },
  image: {
    left: '30px',
    top: '100px',
    position: 'absolute',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  profileComponents: {
    marginTop: '70px',
    padding: ' 0 20px 20px 20px',     //top right bottom left
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {   //image icon profile
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  overlay3: {   //edit icon profile
    position: 'absolute',
    right:'20px',
    top: '200px',
  },
  overlay4: {   //edit icon conoscenze
    position: 'absolute',
    right:'20px',
    top: '20px',
  },
  overlay5: {   //add icon conoscenze
    position: 'absolute',
    right:'20px',
    top: '70px',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
}));