import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Paper, Container } from '@material-ui/core';

import useStyles from './styles';

const Skill = ({ index, arrayLength, skill  }) => {

    const classes = useStyles();

    const res = skill.split('$');
    const description = res[0];
    const experience = res[1];

    return (
    <div>
        <Typography className={`${classes.base} ` + (index<arrayLength-1 && `${classes.borderBottom}`)} >{description}:{experience}</Typography>
    </div>
    );
};

export default Skill;