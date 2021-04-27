import React, { useState, useEffect } from 'react';
import { Grow, Button, Typography, Grid, Paper, Container } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import Score from '../Score/Score';

const Candidate = ({ index, userId, score }) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={5}>
                <Grid className={classes.item} item>
                    {userId}
                </Grid>
                <Grid className={classes.item} item>
                    <Score userVote={score} />
                </Grid>
                <Grid className={classes.item} item>
                    <Button size="small" color="primary" onClick={null} > 
                        <ChatIcon  fontSize="small"/>&nbsp; Chat with candidate </Button>
                </Grid>
            </Grid>
            
        </div>
    );
};

export default Candidate;