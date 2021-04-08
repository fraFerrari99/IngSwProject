import express from 'express';

import { signin, signup } from '../controllers/user.js';     //in graffe siccome importiamo in base a nome e non default
const router = express.Router();

//post because we need to send data from login form to backend
router.post('/signin', signin);
router.post('/signup', signup);

export default router;