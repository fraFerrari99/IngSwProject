import { PD_FETCH_ALL, PD_CREATE, PD_DELETE, PD_UPDATE } from '../constants/actionTypes.js';

export default (state = { profileDetails: null }, action) => {
    switch (action.type) {
        case PD_DELETE:
            return action.payload;
        case PD_UPDATE:
            localStorage.setItem('profileDetails', JSON.stringify({ ...action.payload }));
            console.log('action.data(update): ' + action.payload);
            window.dispatchEvent(new Event("storage"));
            return { ...state, profileDetails: action.payload };
        case PD_FETCH_ALL:
            //state.profileDetails = action.payload;
            localStorage.setItem('profileDetails', JSON.stringify({ ...action.payload }));
            console.log('action.data(get): ' + action.payload);
            window.dispatchEvent(new Event("storage"));
            return { ...state, profileDetails: action.payload };
        case PD_CREATE:
            localStorage.setItem('profileDetails', JSON.stringify({ ...action.payload }));
            window.dispatchEvent(new Event("storage"));
            return [ ... state, action.payload];
        default:
            return state;
    }
}