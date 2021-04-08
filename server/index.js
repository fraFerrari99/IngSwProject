import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import jobOfferRoutes from './routes/jobOffers.js';
import userRoutes from './routes/users.js';
import profileDetailsRoutes from './routes/profileDetails.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", exended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", exended: true }));
app.use(cors());

app.use('/jobOffers', jobOfferRoutes);      //added prefix /jobOffers to all routes in jobOffers
app.use('/user', userRoutes);
app.use('/profile', profileDetailsRoutes);

const CONNECTION_URL = 'mongodb+srv://user:password.mongodb@cluster0.gkpdn.mongodb.net/projectDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;      //heroku will auto populate the first opz

//connect to DB, use... is added to avoid terminal warnings
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))     //conn successfull
    .catch((error) => console.log(error.message));      //conn failed

mongoose.set('useFindAndModify', false);        //to avoid terminal warnings
