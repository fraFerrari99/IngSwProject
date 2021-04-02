import React from 'react';
import { Typography, Paper, Container, Grid } from '@material-ui/core';

import useStyles from './styles';

const Profile = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?.name) {
        return (
            <Grid item xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        Please Sign In to view your Profile.
                    </Typography>
                </Paper>
            </Grid>
        )
    }

    return (
        <Container component="main"  maxWidth="lg" >
            <Grid item xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        Profile
                    </Typography>
                </Paper>
            </Grid>
        </Container>
    );
};

export default Profile;