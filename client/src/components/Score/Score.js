import React, { useState, useEffect } from 'react';
import { Grow, Button, Typography, Grid, Paper, Container } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Score = ({ userVote }) => {

    const classes = useStyles();

    return (
        <Typography variant="h6" className={`${classes.numberCircle} ${userVote < 50 ? `${classes.redColor}` : (userVote < 75) ? `${classes.yellowColor}` : `${classes.greenColor}` }`}> {userVote} </Typography>
    );
};

export default Score;