import React from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const ErrorMessage = ({ text, showError, setShowError }) => {

    return (
        <Collapse in={showError} style={{ margin: '10px' }}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => { setShowError(false); }} > <CloseIcon fontSize="inherit" /> </IconButton>} >
                Error! {text}
            </Alert>
        </Collapse>
    );
};

export default ErrorMessage;