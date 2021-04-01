import { combineReducers } from 'redux';

import jobOffers from './jobOffers';
import auth from './auth';

export default combineReducers({ jobOffers, auth });