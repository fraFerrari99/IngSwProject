import React from 'react'
import { Container, Grow, Grid } from '@material-ui/core';

import JobOffers from '../JobOffers/JobOffers';

const Home = ({ currentId, setCurrentId,profileDetails,setJobOfferTitle,jobOfferTitle }) => {

    return(
        <Grow in>
            <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <JobOffers setCurrentId={setCurrentId} currentId={currentId} profileDetails={profileDetails} setJobOfferTitle={setJobOfferTitle} JobOfferTitle={jobOfferTitle}/>
                        </Grid>
                    </Grid>
                </Container>
        </Grow>
    )
}

export default Home