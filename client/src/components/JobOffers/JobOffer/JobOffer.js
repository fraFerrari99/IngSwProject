import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';

import { deleteJobOffer } from '../../../actions/jobOffers';

import useStyles from './styles';

const JobOffer = ({ jobOffer, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

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
              <Button size="small" color="primary" > <AddIcon  fontSize="small"/> View </Button>
            {( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && (
              <Button size="small" color="primary" component={Link} to="/postJobOffer" onClick={() => setCurrentId(jobOffer._id)} > 
                <EditIcon  fontSize="small"/>  Edit  
              </Button>
            )}
            {( user?.result?.googleId == jobOffer?.creator || user?.result?._id == jobOffer?.creator) && (
              <Button className={classes.deleteButton} size="small" color="secondary" onClick={() => dispatch(deleteJobOffer(jobOffer._id))}>
                <DeleteIcon  fontSize="small"/> Delete
              </Button>
            )}
          </CardActions>
        </Card>
      );
    
}

export default JobOffer;