import { combineReducers } from 'redux';

import jobOffers from './jobOffers';
import auth from './auth';
import profileDetails from './profileDetails';

export default combineReducers({ jobOffers, auth, profileDetails });