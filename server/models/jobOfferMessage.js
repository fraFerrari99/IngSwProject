import mongoose from 'mongoose';

//mongoose allows us to get uniformity, each jobOffer is going to have this things
const jobOfferSchema = mongoose.Schema({
    company: String,
    title: String,
    description: String,
    name: String,           //creator name, automatically picked
    creator: String,        //creator id
    requirements: [String],
    logo: String,        //we will convert an image into a string using base64
    RAL: String,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    appliances: [String],   //array of appliences
});     

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

export default JobOffer;