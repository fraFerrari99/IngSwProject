import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PostJobOffer from './components/PostJobOffer/PostJobOffer';
import useStyles from './styles';
import Auth from './components/Auth/Auth';

const App = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    console.log(user);

    //used to pass JSX component to the children
    const _PostJobOffer = (props) => {
        return (
          <PostJobOffer currentId={currentId} setCurrentId={setCurrentId} {...props} />
        );
    }

    const _Home = (props) => {
        return (
          <Home currentId={currentId} setCurrentId={setCurrentId} {...props} />
        );
    }

    useEffect(() => {
        const token = user?.token;

        //JWT

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [window.location]);

    return (
    <BrowserRouter>
        <Container maxidth="lg">
            <Navbar setCurrentId={setCurrentId} user={user} setUser={setUser}/>
            <Switch>
                <Route path="/" exact component={_Home}/>
                <Route path="/postJobOffer" exact component={_PostJobOffer}/>
                <Route path="/auth" exact component={Auth}/>
            </Switch>
        </Container>
    </BrowserRouter> 
    )
}

export default App;