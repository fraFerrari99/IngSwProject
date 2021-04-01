import React from 'react'
import { Container, Grow, Grid } from '@material-ui/core';

import Form from '../Form/Form';

const PostJobOffer = ({ currentId, setCurrentId }) => {
    return(
        <Grow in>
            <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={5}>
                        <Grid item xs={12} sm={8}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
        </Grow>
    )
}

export default PostJobOffer;