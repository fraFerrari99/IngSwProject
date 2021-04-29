import React from 'react';
import Modal from 'react-modal';
import { Card, CardActions, CardContent, Button, Typography, DialogContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

import Candidate from '../../Candidate/Candidate';

import { deleteJobOffer, applyToJobOffer } from '../../../actions/jobOffers';

import useStyles from './styles';

const JobOffer = ({ jobOffer, setCurrentId, profileDetails }) => {
    Modal.setAppElement('#root');

    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [applianceModal, setApplianceModal] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId =  user?.result?.googleId || user?.result?._id;
    const [userVote, setUserVote] = React.useState(calculateScore);

    //functions used to open/close modal overlay
    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      //subtitle.style.color = '#f00';
    }

    function closeModal(){
      setIsOpen(false);
    }

    const HtmlTooltip = withStyles((theme) => ({
      tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        border: '1px solid #dadde9',
      },
    }))(Tooltip);

    function calculateScore(){
      //niente skill utente, non possibile calcolare punteggio
      if(!profileDetails)
        return -1;
      //niente requisiti, punteggio = 100
      else if(jobOffer.requirements.length == 0 || jobOffer.requirements == "" || !jobOffer.requirements )
        return 100;
      //altrimenti calcola punteggio
      else {
         var count = 0; var userScore = 0;
         jobOffer.requirements.map(elementJobOffer => {
            var elDescriptionJobOffer = elementJobOffer.split('$',1).join().toLowerCase();
            var levelJobOffer = elementJobOffer.substr(elementJobOffer.indexOf('$')+1);
            profileDetails.skills.map(elementSkill => {
              var elDescriptionSkill = elementSkill.split('$',1).join().toLowerCase();
              if (elDescriptionJobOffer == elDescriptionSkill) {
                //trovata descrizione uguale
                count++;
                var levelSkill = elementSkill.substr(elementSkill.indexOf('$')+1);
                //ASCII VALUES: A=65, B=66, C=67
                var resultASCII = levelJobOffer.charCodeAt() - levelSkill.charCodeAt();
                if(resultASCII == -2) {
                  //requested 2 levels more than user has
                  userScore+=0.33;
                }
                else if(resultASCII == -1) {   
                  //requested 1 level more than user has
                  userScore+=0.66;
                }
                else if(resultASCII >= 0) {
                  //user has same level or more
                  userScore+=1;
                };
              }

            })
          })
          return 100 / count * userScore;
      }
    }


    //modal style
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '30%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
      }, 
      overlay: {
        background: 'rgba(0,0,0, 0.5)',
      },
    };

    //controlla se il dispositivo è mobile
    window.mobileCheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    const Appliances = () => {
      
      if (jobOffer.appliances.length > 0) {
        return jobOffer.appliances.find((appliance) => appliance == userId)
          ? (
            <div className={classes.textIcon}><AddIcon fontSize="small" />&nbsp;{jobOffer.appliances.length > 2 ? `You and ${jobOffer.appliances.length - 1} other candidates` : `${jobOffer.appliances.length} candidate${jobOffer.appliances.length > 1 ? 's' : ''}` }</div>
            ) : (
            <div className={classes.textIcon}><AddIcon fontSize="small" />&nbsp;{jobOffer.appliances.length} {jobOffer.appliances.length === 1 ? 'Candidate' : 'Candidates'}</div>
          );
      }
      return <div className={classes.textIcon}><AddIcon fontSize="small" />&nbsp;Apply</div>;
    };

    var isMobile = window.mobileCheck();

    //aggiugnere al model i dati dell'offerta di lavoro selezionata

    return (
        <Card className={classes.root} >
          <CardContent>
            <Typography variant="h5" component="h1" >
                {jobOffer.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {jobOffer.company}
            </Typography>
            
            <Typography className={`${classes.pos} ${classes.dispayDescription}`} variant="body2" component="p">
                {jobOffer.description}
            </Typography>  
            
            { (jobOffer.RAL) && (
                <Typography variant="body2" component="p">
                    {jobOffer.RAL} €/year
                </Typography>
            )}

          </CardContent>
          <CardActions >
              <Button size="small" color="primary" onClick={openModal} > <AddIcon  fontSize="small"/> View </Button>
              
              <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="JobOffer Details" >
                {!isMobile &&
                  <div className={classes.action}>
                    
                    {userVote != 100 && <Typography variant="h6" className={`${classes.overlay1} ${classes.numberCircle} ${userVote < 50 ? `${classes.redColor}` : (userVote < 75) ? `${classes.yellowColor}` : `${classes.greenColor}` }`}> {userVote} </Typography>}
                    
                    <div className={classes.overlay2}>   
                      {(( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && jobOffer.appliances.length > 0) ? (
                        <Button className={classes.deleteButton} size="small" color="primary" onClick={() => setApplianceModal(true)}> Appliances </Button>
                      ) : 
                      <Button color="primary" size="small" disabled={!user?.result} onClick={() => dispatch(applyToJobOffer(jobOffer._id, {userId: userId}))}> 
                        <Appliances />
                      </Button> }
                    </div>
                  </div>
                }
                
                <div className={(!isMobile ? `${classes.mainModalSpacing}` : undefined)}>
                  <div className={classes.borderBottom}>
                    <Typography variant="h5" component="h1" >
                      {jobOffer.title}
                    </Typography>
                    <Typography style={{marginTop: '4px', marginBottom: '4px'}} className={classes.pos}  color="textSecondary">
                      {jobOffer.company}
                    </Typography>
                    {(jobOffer.RAL) && (
                      <Typography variant="body2" component="p">
                        {jobOffer.RAL} €/year
                      </Typography>
                    )}  
                  </div>
                  
                  <Typography className={(isMobile ? `${classes.displayDescriptionInModelMobile}` : `${classes.displayDescriptionInModel}`)} variant="body2" component="p">
                    {jobOffer.description}
                  </Typography>

                  <div className={classes.borderTop}>
                    <Typography variant="body2">{moment(jobOffer.createdAt).fromNow()}</Typography>
                  </div>

                  {isMobile &&
                  <div>
                    {userVote != 100 && <Typography variant="h6" className={`${classes.numberCircle} ${userVote < 50 ? `${classes.redColor}` : (userVote < 75) ? `${classes.yellowColor}` : `${classes.greenColor}` }`}> {userVote} </Typography>}
                    <div>
                    {(( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && jobOffer.appliances.length > 0) ? (
                        <Button className={classes.deleteButton} size="small" color="primary" onClick={() => setApplianceModal(true)}> Appliances </Button>
                      ) :
                      <Button color="primary" size="small" disabled={!user?.result} onClick={() => dispatch(applyToJobOffer(jobOffer._id, {userId: userId}))}> 
                        <Appliances />
                      </Button> }
                    </div>
                  </div>
                }
                </div> 
              </Modal>

              <div>
                <Dialog open={applianceModal} onClose={() => setApplianceModal(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">Candidates</DialogTitle>
                    <div style={{margin: '20px'}}>
                      { jobOffer.appliances  &&
                        jobOffer.appliances.map((candidate) => (
                          <DialogContentText id="alert-dialog-description">
                            <Candidate userId={candidate} score={87} />
                          </DialogContentText>
                        )) 
                      }
                    </div>
                </Dialog>
              </div>

            {( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && (
              <Button size="small" color="primary" component={Link} to="/postJobOffer" onClick={() => setCurrentId(jobOffer._id)} > 
                <EditIcon  fontSize="small"/>  Edit </Button>
            )}
            {( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator ) && (
              <Button className={classes.deleteButton} size="small" color="secondary" onClick={() => dispatch(deleteJobOffer(jobOffer._id))}>
                <DeleteIcon  fontSize="small"/> Delete </Button>
            )}
          </CardActions>
        </Card>
      );
    
}

export default JobOffer;