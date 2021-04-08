import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Paper, Container } from '@material-ui/core';

import useStyles from './styles';

const Skill = ({ skill }) => {

    const description = skill[0];
    const experience = skill[1];

    return (
    <div>
        <Typography>{description}</Typography>
        <Typography>{experience}</Typography>
    </div>
    );
};

export default Skill;