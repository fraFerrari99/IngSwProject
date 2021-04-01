import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import { getJobOffers } from '../../actions/jobOffers';
import JobOffer from './JobOffer/JobOffer';

import useStyles from './styles';

const JobOffers = ({ setCurrentId }) => {
    const classes = useStyles();
    const jobOffers = useSelector((state) => state.jobOffers);      //named after obj inside reducers/index.js
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getJobOffers());
    }, [dispatch]);

    return (
        !jobOffers.length ? <CircularProgress /> : (
            <Grid className={classes.main} container alignItems="stretch" spacing={3} pt={10} mt={10} >
                {jobOffers.map((jobOffer) => (
                    <Grid key={jobOffer._id} item xs={12} sm={10}>
                        <JobOffer jobOffer={jobOffer} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );

}

export default JobOffers;