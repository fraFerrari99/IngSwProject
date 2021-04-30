import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

  root: {
    minWidth: '275px',
    maxHeight: '300px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  deleteButton: {
    float: "right",
    position: "relative",
  },
  dispayDescription: {
    overflow: 'hidden',
    display: '-webkit-box',
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": 'vertical',
  },
  displayDescriptionInModel: {
    display: 'inline-block',
    overflow: 'auto',
    maxHeight: '350px',
    whiteSpace: 'pre-line',
  },
  displayDescriptionInModelMobile: {
    display: 'inline-block',
    overflow: 'auto',
    maxHeight: '250px',
    whiteSpace: 'pre-line',
  },
  borderBottom: {
    borderBottom: '1px solid gray', 
    marginBottom: '8px', 
    paddingBottom: '8px',
  },
  borderTop: {
    borderTop: '1px solid gray', 
    marginTop: '8px', 
    paddingTop: '8px',
  },
  //only if not mobile
  mainModalSpacing: {
    marginLeft: '3%', 
    marginTop: '3%', 
    marginRight: '3%',
    marginBottom: '3%',
  },
  action: {
    position: 'absolute',
    right:'10px',
    top: '30px',
    width: '300px',
  },
  overlay1: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    right: '75px',
    textAlign: 'center',
    paddingTop: '15px',
  },
  overlay2: {
    position: 'absolute',
    marginTop: '45px',
    width: 'auto',
    right: '60px',
    whiteSpace: 'nowrap',
  },
  textIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  },
  redColor: {
    color: '#f44336',
    border: '2px solid #f44336',
  },
  yellowColor: {
    color: '#ffc107',
    border: '2px solid #ffc107',
  },
  greenColor: {
    color: '#4caf50',
    border: '2px solid #4caf50',
  },
  numberCircle: {
    borderRadius: '50%',
    width: '22.5px',
    height: '22.5px',
    padding: '8px',
    cursor: 'pointer',

    background: '#fff',
    //color: '#666',
    textAlign: 'center',

    font: '20px Arial, sans-serif',
  },

});