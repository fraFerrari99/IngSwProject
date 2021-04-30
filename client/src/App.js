import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChatRoom from './components/Chat/Chat/ChatRoom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PostJobOffer from './components/PostJobOffer/PostJobOffer';
import useStyles from './styles';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';

const App = () => {
    const dispatch = useDispatch();
    const [jobOfferTitle,setJobOfferTitle]=useState(null);
    const [currentId, setCurrentId] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [profileDetails, setProfileDetails] = useState(null);
    var userId = null;
    (user?.result?.googleId) ?  userId = user?.result?.googleId : userId = user?.result?._id;

    //used to pass JSX component to the children
    const _PostJobOffer = (props) => {
        return (
          <PostJobOffer currentId={currentId} setCurrentId={setCurrentId} {...props} />
        );
    }

    const _Home = (props) => {
        return (
          <Home currentId={currentId} setCurrentId={setCurrentId} profileDetails={profileDetails}  setJobOfferTitle={setJobOfferTitle} jobOfferTitle={jobOfferTitle} {...props} />
        );
    }

    const _Profile = (props) => {
        return (
          <Profile user={user} _setProfileDetails={setProfileDetails} {...props} />
        );
    }

    const _Chat=(props)=>{
        return(
           <ChatRoom jobOfferTitle={jobOfferTitle}{...props}/>
        );
    }

    useEffect(() => {
        const token = user?.token;

        //JWT

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [window.location]);
/*
    useEffect(() => {

        dispatch(getProfileDetails( userId ));
        setProfileDetails(JSON.parse(localStorage.getItem('profileDetails')));
    }, [userId]);

    const eventListenerFun = e => {
        setProfileDetails(JSON.parse(localStorage.getItem('profileDetails')));
    };

    useEffect(() => {
        window.addEventListener("storage", eventListenerFun);
    
        return () => window.removeEventListener("storage", eventListenerFun);
      }, []);*/

    return (
    <BrowserRouter>
        <Container maxidth="lg">
            <Navbar setCurrentId={setCurrentId} user={user} setUser={setUser} setProfileDetails={setProfileDetails}/>
            <Switch>
                <Route path="/" exact component={_Home}/>
                <Route path="/postJobOffer" exact component={_PostJobOffer}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/profile" exact component={_Profile}/>
                <Route path="/chat" exact component={_Chat} />
            </Switch>
        </Container>
    </BrowserRouter> 
    )
}

export default App;