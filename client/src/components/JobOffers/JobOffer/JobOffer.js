import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';

import { deleteJobOffer } from '../../../actions/jobOffers';

import useStyles from './styles';

const JobOffer = ({ jobOffer, setCurrentId, currentId }) => {
    Modal.setAppElement('#root');

    var subtitle;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    //functions used to open/close modal overlay
    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }

    function closeModal(){
      setIsOpen(false);
    }

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }, 
      overlay: {
        background: 'rgba(0,0,0, 0.5)',
      }
    };

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
            <Typography className={classes.pos} variant="body2" component="p">
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
              
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>{jobOffer.title}</div>
              </Modal>

            {( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && (
              <Button size="small" color="primary" component={Link} to="/postJobOffer" onClick={() => setCurrentId(jobOffer._id)} > 
                <EditIcon  fontSize="small"/>  Edit </Button>
            )}
            {( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && (
              <Button className={classes.deleteButton} size="small" color="secondary" onClick={() => dispatch(deleteJobOffer(jobOffer._id))}>
                <DeleteIcon  fontSize="small"/> Delete </Button>
            )}
          </CardActions>
        </Card>
      );
    
}

export default JobOffer;