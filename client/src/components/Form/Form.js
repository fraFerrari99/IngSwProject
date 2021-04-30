import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowResize } from 'react-resize-tracker';

import useStyles from './styles';
import { getJobOffers, createJobOffer, updateJobOffer } from '../../actions/jobOffers';

const Form = ({ currentId, setCurrentId }) => {
    const [currentWidth, currentHeight] = useWindowResize();
    const [jobOfferData, setJobOfferData] = useState({ company: '', title: '', description: '', requirements: '', RAL: '', selectedFile: null });
    const classes = useStyles();
    const dispatch = useDispatch();
    const jobOffer = useSelector((state) => currentId ? state.jobOffers.find((p) => p._id == currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(jobOffer) setJobOfferData(jobOffer);
    }, [jobOffer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateJobOffer( currentId, { ...jobOfferData, name: user?.result?.name } ));
        } else {
            dispatch(createJobOffer({ ...jobOfferData, name: user?.result?.name }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setJobOfferData({ company: '', title: '', description: '', requirements: '', RAL: '', selectedFile: null,   });
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create a new Job Offer and Chat with other Users.
                </Typography>
            </Paper>
        )
    }

    return (
        <Container className={(currentWidth > 600 && `${classes.mainContainer}`)} component="main"  maxWidth="lg" >
            <Paper className={classes.paper} elevation={3}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6"> {currentId ? 'Edit' : 'Create' } a Job Offer</Typography>
                    <TextField name="company" variant="outlined" label="Company" required="true" fullWidth value={jobOfferData.company} onChange={(e) => setJobOfferData({ ...jobOfferData, company: e.target.value })} />
                    <TextField name="title" variant="outlined" label="Title" required="true" fullWidth value={jobOfferData.title} onChange={(e) => setJobOfferData({ ...jobOfferData, title: e.target.value })} />
                    <TextField multiline rowsMax={12} name="desctiption" variant="outlined" label="Desctiption" required="true" fullWidth value={jobOfferData.description} onChange={(e) => setJobOfferData({ ...jobOfferData, description: e.target.value })} />
                    <TextField name="requirements" variant="outlined" label="Requirements" fullWidth value={jobOfferData.requirements} onChange={(e) => setJobOfferData({ ...jobOfferData, requirements: e.target.value })} />
                    <TextField name="RAL" variant="outlined" label="RAL" fullWidth value={jobOfferData.RAL} onChange={(e) => setJobOfferData({ ...jobOfferData, RAL: e.target.value })} />
                    <div className={`${classes.fileInput}`}> <FileBase type="file" multiple={false} onDone={({base64}) => setJobOfferData({ ...jobOfferData, selectedFile: base64 }) } /> </div>
                    <Button className={`${classes.root} ${classes.buttonSubmit} ${classes.footerMargin}`} vatiant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button vatiant="contained" className={`${classes.buttonSecondary} ${classes.footerMargin}`} onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </Container>
    );

    

}

export default Form;