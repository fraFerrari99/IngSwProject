import axios from 'axios';

const url = 'http://localhost:5000/jobOffers';

export const fetchJobOffers = () => axios.get(url);
export const createJobOffer = (newJobOffer) => axios.post(url, newJobOffer);
export const deleteJobOffer = (id) => axios.delete(`/jobOffers/${id}`);
export const updateJobOffer = (id, updatedJobOffer) => axios.patch(`/jobOffers/${id}`, updatedJobOffer);
