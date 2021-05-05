
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import { getJobOffers } from '../../actions/jobOffers';
import JobOffer from './JobOffer/JobOffer';
import SearchBox from '../SearchBox/SearchBox';

import useStyles from './styles';

const JobOffers = ({ setCurrentId, currentId, profileDetails,setJobOfferTitle,jobOfferTitle}) => {
    const classes = useStyles();
    const jobOffers = useSelector((state) => state.jobOffers);      //named after obj inside reducers/index.js
    const dispatch = useDispatch();

     // <JobOffer jobOffer={filteredJobOffers} currentId={currentId} setCurrentId={setCurrentId} />
    
   
    //const {title, searchField}= this.state
    //const filteredJobOffers = {jobOffer}.title.filter(JobOffer =>(JobOffer.title.toLowerCase().includes(searchField.toLowerCase())))

    useEffect(() => {
        dispatch(getJobOffers());
    }, [dispatch]);

    return (
        !jobOffers.length ? <CircularProgress /> : (
            <Grid className={classes.main} container alignItems="stretch" spacing={3} pt={10} mt={10} >
                <SearchBox currentId={currentId} setCurrentId={setCurrentId} handleChange={(e) =>this.setState({searchField:e.target.value})} />
                {jobOffers.map((jobOffer) => (
                    <Grid key={jobOffer._id} item xs={12} sm={10}>
                       <JobOffer jobOffer={jobOffer} currentId={currentId} jobOfferTitle={jobOfferTitle} setCurrentId={setCurrentId} profileDetails={profileDetails} setJobOfferTitle={setJobOfferTitle} />
                    </Grid>
                ))}
            </Grid>
        )
    );

}

export default JobOffers;