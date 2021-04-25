import JobOfferMessage from '../models/jobOfferMessage.js';
import mongoose from 'mongoose';

export const getJobOffers = async (req, res) => {
    try {
        const jobOffersMessages = await JobOfferMessage.find();

        //console.log("Current number of JobOffers: " + jobOffersMessages.length);

        res.status(200).json(jobOffersMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createJobOffer = async (req, res) => {
    const jobOffer = req.body;

    const newJobOffer = new JobOfferMessage({ ...jobOffer, creator: req.userId, createdAt : new Date().toISOString() });

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

export const applyToJobOffer = async ( req, res ) => {
    const { id: _id } = req.params;     //rinominato
    const {userId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    var _jobOffer = await JobOfferMessage.findById(_id);

    if(!_jobOffer) return res.status(404).send('No jobOffer found!');

    const index = _jobOffer.appliances.findIndex((id) => id == userId);

    if(index === -1) {
        //like the post
        _jobOffer.appliances.push(userId);
    } else {
        //un-like the post
        _jobOffer.appliances = _jobOffer.appliances.filter((id) => id != userId);
    }

    const updatedJobOffer = await JobOfferMessage.findByIdAndUpdate(_id, { ..._jobOffer }, { new: true });

    res.json(updatedJobOffer);
};