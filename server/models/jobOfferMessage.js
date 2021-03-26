import mongoose from 'mongoose';

//mongoose allows us to get uniformity, each jobOffer is going to have this things
const jobOfferSchema = mongoose.Schema({
    title: String,
    description: String,
    companyName: String,
    creator: String,
    jobRequirements: [String],
    logo: String,        //we will convert an image into a string using base64
    jobApplicants: {
        type: String,
        default: []
    },
    createdAt: {
        type: Date,
        dafault: new Date()
    }
});     

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

export default JobOffer;