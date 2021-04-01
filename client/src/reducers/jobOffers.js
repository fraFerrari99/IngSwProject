import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes.js';

export default (jobOffers = [], action) => {
    switch (action.type) {
        case DELETE:
            return jobOffers.filter((jobOffer) => jobOffer._id != action.payload );
        case UPDATE:
            return jobOffers.map((jobOffer) => jobOffer._id == action.payload._id ? action.payload : jobOffer);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [ ... jobOffers, action.payload];
        default:
            return jobOffers;
    }
}