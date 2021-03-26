import express from 'express';
import { getJobOffers, createJobOffer } from '../controllers/jobOffers.js';     //in graffe siccome importiamo in base a nome e non default

const router = express.Router();

router.get('/', getJobOffers);
router.post('/', createJobOffer);

export default router;