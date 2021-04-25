import { FETCH_ALL, CREATE, DELETE, UPDATE} from '../constants/actionTypes.js';
import * as api from '../api/index.js';

//Action Creators

export const getJobOffers = () => async(dispatch) => {
    try {
        const { data } = await api.fetchJobOffers();
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }

}

export const createJobOffer = (jobOffer) => async(dispatch) => {
    try {
        const { data } = await api.createJobOffer(jobOffer);

        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }

} 

export const deleteJobOffer = (id) => async (dispatch) => {
    try {
        await api.deleteJobOffer(id);

        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const updateJobOffer = (id, jobOffer) => async (dispatch) => {
    try {
        const { data } = await api.updateJobOffer(id, jobOffer);

        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const applyToJobOffer = (id, userId) => async (dispatch) => {
    try {

        const { data } = await api.applyToJobOffer(id, userId);

        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}