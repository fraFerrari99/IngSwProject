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
  }
});