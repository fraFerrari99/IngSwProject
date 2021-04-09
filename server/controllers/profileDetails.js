import mongoose from 'mongoose';
import ProfileDetails from '../models/profileDetails.js';

export const getProfileDetails = async (req, res) => {
    const { id } = req.params;     //rinominato

    try {
        const _ProfileDetails = await ProfileDetails.findOne({ owner: id });

        if(!_ProfileDetails) return res.status(404).send('User has no profile details');

        console.log(_ProfileDetails);

        res.status(200).json(_ProfileDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createProfileDetails = async (req, res) => {
    const { description, level } = req.body;

    const newSkill = `${description}$${level}$`;    //skills trasformate in stringa, $ per dividere ( fare in modo che non possa essere inserito!! )

    const newProfile = new ProfileDetails({ skills: newSkill , owner: req.userId });

    try {
        await newProfile.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateProfileDetails = async ( req, res ) => {
    const { id } = req.params;

    const { description, level } = req.body;

    var newSkill = `${description}$${level}$`;

    console.log('current id(update): ' + id);
    console.log('current newSkill(update): ' + newSkill);

    var _ProfileDetails = await ProfileDetails.findOne({ owner: id });

    console.log('current _profileDetails(update) : ' + _ProfileDetails);

    if(!_ProfileDetails) return res.status(404).send('User has no profile details(update)');

    const _id = _ProfileDetails._id;

    newSkill = newSkill.concat(_ProfileDetails.skills);

    console.log('updated skills(update) : ' + newSkill);

    _ProfileDetails.skills = newSkill;

    const updatedProfileDetails = await ProfileDetails.findByIdAndUpdate(_id, { ..._ProfileDetails }, { new: true });

    res.json(updatedProfileDetails);
};

export const deleteProfileDetails = async ( req, res ) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Profile Details with that id');

    await ProfileDetails.findByIdAndRemove(id);

    res.json({ message: 'Profile Details deleted succesfully' });
};