import express from 'express';

import { getJobOffers, createJobOffer, deleteJobOffer, updateJobOffer, applyToJobOffer } from '../controllers/jobOffers.js';     //in graffe siccome importiamo in base a nome e non default

import auth from '../middleware/auth.js';   //.js because its backend
const router = express.Router();

//we need to check for permissions from middleware before posting, updating and deleting job offers!
//we don't need for permission before looking at the offers
router.get('/', getJobOffers);
router.post('/', auth, createJobOffer);
router.patch('/:id', auth,  updateJobOffer);
router.delete('/:id', auth, deleteJobOffer);
router.post('/apply/:id', auth, applyToJobOffer);

export default router;