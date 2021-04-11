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

    const newSkill = `${description}$${level}`;
    
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

    var newSkill = `${description}$${level}`;

    var _ProfileDetails = await ProfileDetails.findOne({ owner: id });

    if(!_ProfileDetails) return res.status(404).send('User has no profile details, cannot update profile!');

    const _id = _ProfileDetails._id;

    var flag = false; var i = 0;

    while(i < _ProfileDetails.skills.length){
        if(_ProfileDetails.skills[i].split('$',1).join().toUpperCase() === description.toUpperCase()){
            _ProfileDetails.skills[i] = newSkill;
            flag = true;
            break;
        }
        i++;
    }

    (!flag) && _ProfileDetails.skills.push(newSkill);

    const updatedProfileDetails = await ProfileDetails.findByIdAndUpdate(_id, { ..._ProfileDetails }, { new: true });

    res.json(updatedProfileDetails);
};

export const deleteProfileDetails = async ( req, res ) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Profile Details with that id');

    await ProfileDetails.findByIdAndRemove(id);

    res.json({ message: 'Profile Details deleted succesfully' });
};