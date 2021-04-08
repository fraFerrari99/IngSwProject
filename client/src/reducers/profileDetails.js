import { PD_FETCH_ALL, PD_CREATE, PD_DELETE, PD_UPDATE } from '../constants/actionTypes.js';

export default (state = { profileDetails: null }, action) => {
    switch (action.type) {
        case PD_DELETE:
            return action.payload;
        case PD_UPDATE:
            return action.payload;
        case PD_FETCH_ALL:
            //state.profileDetails = action.payload;
            localStorage.setItem('profileDetails', JSON.stringify({ ...action.payload }));
            console.log('action.data: ' + action.payload);
            return { ...state, profileDetails: action.payload };
        case PD_CREATE:
            return [ ... state, action.payload];
        default:
            return state;
    }
}