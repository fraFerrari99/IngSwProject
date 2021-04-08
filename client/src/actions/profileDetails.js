import { PD_FETCH_ALL, PD_CREATE, PD_DELETE, PD_UPDATE} from '../constants/actionTypes.js';
import * as api from '../api/index.js';

//Action Creators

export const getProfileDetails = (owner) => async(dispatch) => {
    try {

        const { data } = await api.fetchProfileDetails(owner);
        
        console.log('data sent :' + data);
        
        dispatch({ type: PD_FETCH_ALL, payload: data });

    } catch (error) {
        console.log(error.message);
    }

}

export const createProfileDetails = (profileDetails) => async(dispatch) => {
    try {
        const { data } = await api.createProfileDetails(profileDetails);

        dispatch({ type: PD_CREATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }

} 

export const deleteProfileDetails = (id) => async (dispatch) => {
    try {
        await api.deleteProfileDetails(id);

        dispatch({ type: PD_DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const updateProfileDetails = (id, jobOffer) => async (dispatch) => {
    try {
        const { data } = await api.updateProfileDetails(id, jobOffer);

        dispatch({ type: PD_UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}