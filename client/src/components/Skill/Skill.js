import React from 'react';
import { Grow, Button, Typography, Grid, Paper, Container } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import { deleteSkill } from '../../actions/profileDetails';

const Skill = ({ index, arrayLength, skill, showDeleteIcon, userId, profileCalling, skillArray }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const res = skill.split('$');
    const description = res[0];
    const experience = res[1];

    const deleteSkillFunction = (e) => {
        e.preventDefault();
        
        dispatch(deleteSkill( userId, {index: index} ));
    }

    const deleteSkillFromArray = () => {
        console.log('pre , ' + skillArray);
        skillArray.splice(index, 1);
        console.log('dopo , ' + skillArray);
    }

    return (
        <div>
            <Grid container className={index<arrayLength-1 && `${classes.borderBottom}`}>
                <Grid item xs={8} sm={8}>
                    <Typography className={classes.base} >{description}</Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Typography className={classes.base} >{experience}</Typography>
                </Grid>
                {showDeleteIcon &&
                    <Grow in>
                        <Grid item xs={2} sm={2}>
                            <Button className={classes.clearIcon} size="small" onClick={profileCalling ? deleteSkillFunction : deleteSkillFromArray}> <ClearIcon fontSize="default" /> </Button> 
                        </Grid>
                    </Grow>
                }
            </Grid>
        </div>
    );
};

export default Skill;