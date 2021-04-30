import express from 'express';

import { getProfileDetails, updateProfileDetails, createProfileDetails, deleteProfileDetails, deleteSkill } from '../controllers/profileDetails.js';     //in graffe siccome importiamo in base a nome e non default

import auth from '../middleware/auth.js';   //.js because its backend
const router = express.Router();

router.get('/profileDetails/:id', getProfileDetails);
router.post('/profileDetails', auth, createProfileDetails);
router.patch('/profileDetails/:id', auth, updateProfileDetails);
router.post('/profileDetails/skill/:id', auth, deleteSkill);
router.delete('/profileDetails/:id', auth, deleteProfileDetails);

export default router;