import JobOfferMessage from '../models/jobOfferMessage.js';

export const getJobOffers = async (req, res) => {
    try {
        const jobOffersMessages = await JobOfferMessage.find();

        console.log(jobOffersMessages);

        res.status(200).json(jobOffersMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createJobOffer = async (req, res) => {
    const jobOffer = req.body;

    const newJobOffer = new JobOfferMessage(jobOffer);

    try {
        await newJobOffer.save();

        res.status(201).json(newJobOffer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};