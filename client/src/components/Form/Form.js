import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowResize } from 'react-resize-tracker';

import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/styles';

import useStyles from './styles';
import { createJobOffer, updateJobOffer } from '../../actions/jobOffers';
import Skill from '../Skill/Skill';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const initialStateSkill = { description: '', level: '' };
const initialStateJobOffer = { company: '', title: '', description: '', requirements: '', RAL: '' };

const Form = ({ currentId, setCurrentId }) => {
    const jobOffer = useSelector((state) => currentId ? state.jobOffers.find((p) => p._id == currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const [requirementsArray, setRequirementsArray] = React.useState(jobOffer?.requirements ? jobOffer.requirements : []);
    const [currentWidth, currentHeight] = useWindowResize();
    const [jobOfferData, setJobOfferData] = useState(initialStateJobOffer);
    const [_skill, setSkill] = useState(initialStateSkill);  //keeps track of desc and level until handleSubmit, then inserted into skill
    const [errorSkill, setErrorSkill] = React.useState('general');
    const [showErrorSkill, setShowErrorSkill] = React.useState(false);
    const [errorForm, setErrorForm] = React.useState('general');
    const [showErrorForm, setShowErrorForm] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        if(jobOffer) setJobOfferData(jobOffer);
    }, [jobOffer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(jobOfferData.company == ''){
            setErrorForm('Empty Company!');
            setShowErrorForm(true);
            return;
        } else if(jobOfferData.title == ''){
            setErrorForm('Empty title!');
            setShowErrorForm(true);
            return;
        } else if(jobOfferData.description == ''){
            setErrorForm('Empty Description!');
            setShowErrorForm(true);
            return;
        } else setShowErrorForm(false);

        if(currentId) {
            dispatch(updateJobOffer( currentId, { ...jobOfferData, name: user?.result?.name, requirements: requirementsArray } ));
        } else {
            dispatch(createJobOffer({ ...jobOfferData, name: user?.result?.name, requirements: requirementsArray }));
        }
        clear();
    }

    const addRequirement = () => {

        if(jobOfferData.company == '' || jobOfferData.title == '' || jobOfferData.description == ''){
            setErrorSkill(`Can't add requirements to non existing JobOffer!`);
            setShowErrorSkill(true);
            return;
        }

        if(_skill.description == ''){
            setErrorSkill('Empty Description');
            setShowErrorSkill(true);
            return;
        } else if(_skill.description.indexOf('$') != -1){
            setErrorSkill('Invalid Character in Description');
            setShowErrorSkill(true);
            return;
        } else if(_skill.level == ''){
            setErrorSkill('Empty Level');
            setShowErrorSkill(true);
            return;
        } else setShowErrorSkill(false);

        var util = _skill.description + '$' + _skill.level;
        var flag = false; var utilIndex;
        requirementsArray.map((element, index) => {
            if(element.split('$',1).join().toLowerCase() === _skill.description.toLowerCase()){       
                flag = true; utilIndex = index; 
            }
        })
        if(!flag) setRequirementsArray(oldArray => [...oldArray, util]);  //aggiunta in coda se non presente
        else {
            let updatedArray = [...requirementsArray];  //se presente sostituisci
            updatedArray[utilIndex] = util;
            setRequirementsArray(updatedArray);
        }
        clearSkill();
    }

    const clearSkill = () => {
        setSkill(initialStateSkill);
        document.getElementById('idDescription').value = '';
        _skill.level = "";
    }

    const clear = () => {
        if(jobOffer) {
            setJobOfferData(jobOffer);
            setRequirementsArray(jobOffer?.requirements ? jobOffer.requirements : []);
        }
        else{
            setCurrentId(null);
            setJobOfferData({ company: '', title: '', description: '', requirements: '', RAL: '',  _skill: '' });
        }
    }

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          border: '1px solid #dadde9',
        },
      }))(Tooltip);

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create a new Job Offer and Chat with other Users.
                </Typography>
            </Paper>
        )
    }

    const handleChange = (e) => {
        setSkill({ ..._skill, [e.target.name]: e.target.value });
    };

    return (
        <Container className={(currentWidth > 600 && `${classes.mainContainer}`)} component="main"  maxWidth="lg" >
            <Paper className={classes.paper} elevation={3}>
                <form autoComplete="off" noValidate style={{marginRight: '10px'}} className={`${classes.root}`} onSubmit={handleSubmit}>
                    <Typography variant="h6" className={classes.center}> {currentId ? 'Edit' : 'Create' } a Job Offer</Typography>
                    <TextField name="company" variant="outlined" label="Company" required="true" fullWidth value={jobOfferData.company} onChange={(e) => setJobOfferData({ ...jobOfferData, company: e.target.value })} />
                    <TextField name="title" variant="outlined" label="Title" required="true" fullWidth value={jobOfferData.title} onChange={(e) => setJobOfferData({ ...jobOfferData, title: e.target.value })} />
                    <TextField multiline rowsMax={12} name="desctiption" variant="outlined" label="Desctiption" required="true" fullWidth value={jobOfferData.description} onChange={(e) => setJobOfferData({ ...jobOfferData, description: e.target.value })} />
                    <TextField name="RAL" variant="outlined" label="RAL" fullWidth value={jobOfferData.RAL} onChange={(e) => setJobOfferData({ ...jobOfferData, RAL: e.target.value })} />

                    <ErrorMessage text={errorForm} showError={showErrorForm} setShowError={setShowErrorForm} />

                    <div fullWidth>
                        <Typography variant="h6" className={classes.center}> Requirements </Typography>

                        <Grid container className={`${classes.gridContainer}`} spacing={1} fullwidth>
                            <Grid item className={classes.item} xs={12} sm={8}>
                                <TextField id="idDescription" name="description" onChange={handleChange} variant="outlined" fullWidth label={"description"}/>
                            </Grid>
                            <HtmlTooltip placement="top" arrow
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Levels of Experience</Typography>
                                        <Typography display="inline">C </Typography> <em>{"0-2 years of experience"}</em><br />
                                        <Typography display="inline">B </Typography><em>{"2-5 years of experience"}</em><br />
                                        <Typography display="inline">A </Typography><em>{"5+ years of experience"}</em><br />
                                    </React.Fragment>
                                }
                            >
                                <Grid item className={classes.item} xs={4} sm={2}>
                                    <FormControl  fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">level</InputLabel>
                                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleChange} name="level" label="level" defaultValue="" value={_skill.level} >
                                            <MenuItem name='A' value={'A'}>A</MenuItem>
                                            <MenuItem name='B' value={'B'}>B</MenuItem>
                                            <MenuItem name='C' value={'C'}>C</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </HtmlTooltip>
                            <Button className={classes.doneButton} variant="contained" color="primary" onClick={addRequirement}>
                                <DoneIcon fontSize="default" />
                            </Button>
                        </Grid>

                        <div>
                            {( !jobOffer?.requirements ) ? <Typography component="p" className={classes.marginLeft}>No requirements currently</Typography> : 
                                <Grid>
                                    {requirementsArray.length > 0 ?
                                        requirementsArray.map((skill, index) => (
                                            <Skill index={index} arrayLength={requirementsArray.length} skill={skill} showDeleteIcon={true} userId={null} profileCalling={false} skillArray={requirementsArray} setRequirementsArray={setRequirementsArray}/>
                                        )) : <Typography component="p" className={classes.marginLeft}>No requirements currently</Typography> }
                                </Grid>
                            }
                        </div>

                        <ErrorMessage text={errorSkill} showError={showErrorSkill} setShowError={setShowErrorSkill} />

                    </div>

                    <Button className={`${classes.root} ${classes.buttonSubmit} ${classes.footerMargin}`} vatiant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button vatiant="contained" className={`${classes.buttonSecondary} ${classes.footerMargin}`} onClick={clear} fullWidth>{jobOffer ? 'Undo' : 'Clear'}</Button>
                
                </form>
            </Paper>
        </Container>
    );
}

export default Form;