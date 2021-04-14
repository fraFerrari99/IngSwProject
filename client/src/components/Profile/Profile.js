import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, TextField, CardContent, CardMedia, Button, Typography, Grid, Paper, Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import dafaultProfilePicture from '../../images/defaultUserPicture.png';
import defaultBackground from '../../images/defaultBackground.PNG';
import Skill from '../Skill/Skill';

import { getProfileDetails, createProfileDetails, deleteProfileDetails, updateProfileDetails } from '../../actions/profileDetails';

const initialStateSkill = { description: '', level: '' };
const initialStateProfileData = { skill: '', profilePicture: null, backgroundPicture: null }

const Profile = ({user}) => {
    Modal.setAppElement('#root');
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isProfile, setIsProfile] = useState(false);
    const [modalIsOpen,setIsOpen] = React.useState(false);
    
    const [profileDetails, setProfileDetails] = useState(null);     //profileData client side
    var userId = null;
    var currentFile = null; var clearValue = false;
    (user?.result?.googleId) ?  userId = user?.result?.googleId : userId = user?.result?._id;
    
    const [_skill, setSkill] = useState(initialStateSkill);  //keeps track of desc and level until handleSubmit, then inserted into skill
    const [profileData, setProfileData] = useState(initialStateProfileData);    //profileData to update server-side


    //update localstorage
    const eventListenerFun = e => {
        setProfileDetails(JSON.parse(localStorage.getItem('profileDetails')));
    };
    useEffect(() => {
        window.addEventListener("storage", eventListenerFun);
    
        return () => window.removeEventListener("storage", eventListenerFun);
      }, []);

    //roba per modal
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
    
    //ecco il colpevole
    const handleChange = (e) => {
        //clearValue ? setSkill({ ..._skill, [e.target.name]: e.target.value }) : clearValue = !clearValue;
        setSkill({ ..._skill, [e.target.name]: e.target.value });
    };

    //funzioni che servono a differenziare i bottoni che editano la foto profilo/foto background
    //isProfile == true => editare foto profilo, isProfile == false => editare foto background
    function openModalOpt1() {
        setIsProfile(false);
        openModal();
    }

    function openModalOpt2() {
        setIsProfile(true);
        openModal();
    }

    useEffect(() => {
        dispatch(getProfileDetails( userId ));
    }, [userId, window.location]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('(cosa passo)desc: ' + _skill.description + ', lev: ' + _skill.level);
        
        try {
            if(!profileDetails)
                dispatch(createProfileDetails({ ...profileData, skill: _skill.description + '$' + _skill.level }));
            else
                dispatch(updateProfileDetails( userId, {...profileData, skill: _skill.description + '$' + _skill.level }));
        } catch (error) {
            console.log(error);
        }
        clear();
    }
    
    useEffect(() => {
        setProfileDetails(JSON.parse(localStorage.getItem('profileDetails')));
    }, [userId]);

    const clear = () => {
        setSkill(initialStateSkill);
        document.getElementById('idDescription').value = '';
        document.getElementById('idLevel').value = '';
    }

    const updatePicture = () => {
        isProfile ? dispatch(updateProfileDetails( userId, {...profileData, profilePicture: currentFile })) :
        dispatch(updateProfileDetails( userId, {...profileData, backgroundPicture: currentFile }));       

        closeModal();
    }

    //controlla se il dispositivo è mobile
    window.mobileCheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    var isMobile = window.mobileCheck();

    //if user not logged in
    if (!user?.result?.name) {
        return (
            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        Please Sign In to view your Profile.
                    </Typography>
                </Paper>
            </Grid>
        )
    }
    
    return (
    <>
        <Card className={`${classes.card} ` + (!isMobile && `${classes.cardMarginRight}`)}>
            <CardMedia className={classes.media}  image={profileDetails?.backgroundPicture || defaultBackground}/>
            <div className={classes.overlay2}> 
                <Button style={{color: 'white'}} size="small" onClick={openModalOpt1}> <PhotoCameraIcon fontSize="default" /> </Button> 
            </div>
            <div> 
                <img className={classes.image} src={profileDetails?.profilePicture || dafaultProfilePicture} alt="profile picture"  height="140" onClick={openModalOpt2}/>
            </div>
            <div className={classes.overlay3}> 
                <Button style={{color: '#4C4C4C'}} size="small" onClick={openModalOpt2}> <EditIcon fontSize="default" /> </Button> 
            </div>
            <div className={classes.profileComponents}>
                <div style={{padding: '0 16px 16px 16px'}}>
                    <Typography style={{ padding: '0 0 5px 0' }} variant="h5">{user.result.name}</Typography>
                    <Typography variant="body2" color="textPrimary" component="p">Insert here the current working position.</Typography>
                    <Typography variant="body2" color="textPrimary" component="p">Insert here the city you live in.</Typography>
                </div>
            </div>
        </Card>

        <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Edit Profile Details" >
            <div className={(!isMobile && `${classes.mainModalSpacing}`)}>
                <Typography variant="h5" component="h1" align="center" >
                    Please enter your Profile {isProfile ? 'Picture' : 'Background Picture'}
                    <div className={`${classes.fileInput}`}> <FileBase type="file" multiple={false} onDone={({base64}) => currentFile = base64 } /> </div>
                </Typography>
                <Button onClick={updatePicture} size="medium" variant="contained" color="primary">
                        Update Picture
                </Button>
            </div>
        </Modal>

        <Card style={{marginTop: '15px'}} className={`${classes.card} ` + (!isMobile && `${classes.cardMarginRight}`)}>
            <div className={classes.overlay5}> 
                <Button style={{color: '#4C4C4C'}} size="small"> <EditIcon fontSize="default" /> </Button> 
            </div>
            <div className={classes.overlay4}>
                <Button style={{color: '#4C4C4C'}} size="small"> <AddIcon fontSize="default" /> </Button> 
            </div>
            <div style={{padding: '16px 16px 16px 16px'}}>
                <CardContent>
                    <Typography variant="h5">Skills</Typography>
                </CardContent>
                <form autoComplete="off" noValidate style={{marginRight: '50px'}} onSubmit={handleSubmit}>
                    <Grid containter>
                        <Grid item xs={12} sm={8}>
                            <TextField id="idDescription" name="description" onChange={handleChange} variant="outlined" required fullWidth label={"description"}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField id="idLevel" name="level" style={{flexDirection: 'column'}} onChange={handleChange} variant="outlined" required fullWidth label={"level"}/>
                        </Grid>
                        <Button type="submit" size="large" variant="contained" color="primary">
                            Add Skill
                        </Button>
                    </Grid>

                    <div>
                        {( !profileDetails ) ? 'Insert here your skill.' : 
                            <Grid>
                                {profileDetails.skills.map((skill, index) => (
                                    <Skill index={index} arrayLength={profileDetails.skills.length} skill={skill}/>
                                ))}
                            </Grid>
                        }
                    </div>
                    
                </form>
            </div>
        </Card>
    </>
    );
};

export default Profile;