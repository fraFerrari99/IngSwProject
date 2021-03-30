import express from 'express';

import { getJobOffers, createJobOffer, deleteJobOffer, updateJobOffer } from '../controllers/jobOffers.js';     //in graffe siccome importiamo in base a nome e non default

const router = express.Router();

router.get('/', getJobOffers);
router.post('/', createJobOffer);
router.patch('/:id', updateJobOffer);
router.delete('/:id', deleteJobOffer);

export default router;