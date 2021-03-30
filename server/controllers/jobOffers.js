import JobOfferMessage from '../models/jobOfferMessage.js';
import mongoose from 'mongoose';

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

export const deleteJobOffer = async ( req, res ) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await JobOfferMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted succesfully' });
};

export const updateJobOffer = async ( req, res ) => {
    const { id: _id } = req.params;     //rinominato
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedJobOffer = await JobOfferMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

    res.json(updatedJobOffer);
};