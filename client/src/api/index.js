import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//this happens before each of the functions below, and its used to help the middleware
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchJobOffers = () => API.get('/jobOffers');
export const createJobOffer = (newJobOffer) => API.post('/jobOffers', newJobOffer);
export const deleteJobOffer = (id) => API.delete(`/jobOffers/${id}`);
export const updateJobOffer = (id, updatedJobOffer) => API.patch(`/jobOffers/${id}`, updatedJobOffer);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);