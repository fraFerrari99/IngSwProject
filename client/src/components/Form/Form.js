import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { getJobOffers, createJobOffer, updateJobOffer } from '../../actions/jobOffers';

const Form = ({ currentId, setCurrentId }) => {
    const [jobOfferData, setJobOfferData] = useState({ company: '', title: '', description: '', requirements: '', RAL: '', selectedFile: null });
    const classes = useStyles();
    const dispatch = useDispatch();
    const jobOffer = useSelector((state) => currentId ? state.jobOffers.find((p) => p._id == currentId) : null);
    //var modifyPageOpen = false;

    useEffect(() => {
        if(jobOffer) setJobOfferData(jobOffer);
    }, [jobOffer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateJobOffer( currentId, jobOfferData ));
        } else {
            dispatch(createJobOffer(jobOfferData));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setJobOfferData({ company: '', title: '', description: '', requirements: '', RAL: '', selectedFile: null,   });
    }

    return (
        <Container component="main"  maxWidth="lg" >
            <Paper className={classes.paper} elevation={3}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6"> {currentId ? 'Edit' : 'Create' } a Job Offer</Typography>
                    <TextField name="company" variant="outlined" label="Company" fullWidth value={jobOfferData.company} onChange={(e) => setJobOfferData({ ...jobOfferData, company: e.target.value })} />
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={jobOfferData.title} onChange={(e) => setJobOfferData({ ...jobOfferData, title: e.target.value })} />
                    <TextField name="desctiption" variant="outlined" label="Desctiption" fullWidth value={jobOfferData.description} onChange={(e) => setJobOfferData({ ...jobOfferData, description: e.target.value })} />
                    <TextField name="requirements" variant="outlined" label="Requirements" fullWidth value={jobOfferData.requirements} onChange={(e) => setJobOfferData({ ...jobOfferData, requirements: e.target.value })} />
                    <TextField name="RAL" variant="outlined" label="RAL" fullWidth value={jobOfferData.RAL} onChange={(e) => setJobOfferData({ ...jobOfferData, RAL: e.target.value })} />
                    <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({base64}) => setJobOfferData({ ...jobOfferData, selectedFile: base64 }) } /> </div>
                    <Button className={`${classes.root} ${classes.buttonSubmit}`} vatiant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button vatiant="contained" className={classes.buttonSecondary} onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </Container>
    );

    

}

export default Form;