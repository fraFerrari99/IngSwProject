import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import { getJobOffers } from '../../actions/jobOffers';
import JobOffer from './JobOffer/JobOffer';
import SearchBox from '../SearchBox/SearchBox.js';


import useStyles from './styles';


    

const JobOffers = ({ setCurrentId, currentId, profileDetails,setJobOfferTitle,jobOfferTitle}) => {
    const initialSearchState = { searchTerm:''};
    const classes = useStyles();
    const jobOffers = useSelector((state) => state.jobOffers);      //named after obj inside reducers/index.js
    const dispatch = useDispatch();
    const [_query, setQuery] = useState(initialSearchState);


    
//};

    useEffect(() => {
        dispatch(getJobOffers());
    }, [dispatch]);

    
    let filteredJobOffers = [];

    for (let i = 0; i<jobOffers.length; i++){
        if(jobOffers[i].title.toLowerCase().includes(_query.searchTerm))
          filteredJobOffers.push(jobOffers[i]);
    }
    

    if(_query.searchTerm === ""){
    return (
       
        
        !jobOffers.length ? <CircularProgress /> : (
            <Grid className={classes.main} container alignItems="stretch" spacing={3} pt={10} mt={10} >
                <SearchBox currentId={currentId} setCurrentId={setCurrentId} handleChange={(e) =>setQuery({ ..._query, searchTerm: e.target.value })}/>
                {jobOffers.map((jobOffer) => (
                    <Grid key={jobOffer._id} item xs={12} sm={10}>
                        <JobOffer jobOffer={jobOffer} currentId={currentId} jobOfferTitle={jobOfferTitle} setCurrentId={setCurrentId} profileDetails={profileDetails} setJobOfferTitle={setJobOfferTitle} />
                    </Grid>
                ))}
            </Grid>
        )
                    
    );
}
    else{
        return (
       
        
        !jobOffers.length ? <CircularProgress /> : (
            <Grid className={classes.main} container alignItems="stretch" spacing={3} pt={10} mt={10} >
                <SearchBox currentId={currentId} setCurrentId={setCurrentId} handleChange={(e) =>setQuery({ ..._query, searchTerm: e.target.value })}/>
                {filteredJobOffers.map((jobOffer) => (
                    <Grid key={jobOffer._id} item xs={12} sm={10}>
                        <JobOffer jobOffer={jobOffer} currentId={currentId}  jobOfferTitle={jobOfferTitle} setCurrentId={setCurrentId} profileDetails={profileDetails} setJobOfferTitle={setJobOfferTitle}/>
                    </Grid>
                ))}
            </Grid>
        )
                    
    )

    }

}

export default JobOffers;