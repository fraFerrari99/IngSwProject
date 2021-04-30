import mongoose from 'mongoose';
import ProfileDetails from '../models/profileDetails.js';

export const getProfileDetails = async (req, res) => {
    const { id } = req.params;     //rinominato

    try {
        const _ProfileDetails = await ProfileDetails.findOne({ owner: id });

        if(!_ProfileDetails) return res.status(404).send('User has no profile details');

        //console.log(_ProfileDetails);

        res.status(200).json(_ProfileDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createProfileDetails = async (req, res) => {
    const profileDetails = req.body;
    
    //const newProfile = new ProfileDetails({ ...profileDetails , skills: profileDetails.skill,  owner: req.userId, backgroundPicture: profileDetails.backgroundPicture, profilePicture: profileDetails.profilePicture });
    const newProfile = new ProfileDetails({ skills: profileDetails.skill,  owner: req.userId, backgroundPicture: profileDetails.backgroundPicture, profilePicture: profileDetails.profilePicture });

    try {
        await newProfile.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateProfileDetails = async ( req, res ) => {
    const { id } = req.params;

    const profileDetails = req.body;

    //console.log(profileDetails);

    const description = profileDetails.skill.split('$',1).join();

    const _profilePicture = profileDetails.profilePicture;
    
    const _backgroundPicture = profileDetails.backgroundPicture;

    var _ProfileDetails = await ProfileDetails.findOne({ owner: id });

    if(!_ProfileDetails) return res.status(404).send('User has no profile details, cannot update profile!');

    const _id = _ProfileDetails._id;

    var flag = false; var i = 0; var atLeastOneChange = false;

    //if description != initial string, then update with new skill
    if(description != ''){
        atLeastOneChange = true;
        while(i < _ProfileDetails.skills.length){
            if(_ProfileDetails.skills[i].split('$',1).join().toUpperCase() === description.toUpperCase()){
                _ProfileDetails.skills[i] = profileDetails.skill;
                flag = true;
                break;
            }
            i++;
        }
    
        (!flag) && _ProfileDetails.skills.push(profileDetails.skill);
    }

    if(_profilePicture != null){
        atLeastOneChange = true;
        _ProfileDetails.profilePicture = _profilePicture;
    }

    if(_backgroundPicture != null){
        atLeastOneChange = true;
        _ProfileDetails.backgroundPicture = _backgroundPicture;
    }

    if(atLeastOneChange){
        const updatedProfileDetails = await ProfileDetails.findByIdAndUpdate(_id, { ..._ProfileDetails }, { new: true });

        res.json(updatedProfileDetails);

        return;
    }

    return res.status(404).send('No changes made');
};

export const deleteProfileDetails = async ( req, res ) => {
    const { id } = req.params;

    var _ProfileDetails = await ProfileDetails.findOne({ owner: id });

    if(!_ProfileDetails) return res.status(404).send('User has no profile details, cannot reset profile!');

    await ProfileDetails.findByIdAndRemove(_ProfileDetails._id);

    res.json({ message: 'Profile Details deleted succesfully' });
};

export const deleteSkill = async ( req, res ) => {
    //owner id in req.params, index in req.body specifies skill that needs to be deleted

    const { id } = req.params;

    const {index} = req.body;

    //console.log('index ricevuto: ', index);

    var _ProfileDetails = await ProfileDetails.findOne({ owner: id });

    if(!_ProfileDetails) return res.status(404).send('User has no profile details, cannot delete skill!');

    const _id = _ProfileDetails._id;

    if(index<0 || index>_ProfileDetails.skills.length) return res.status(404).send('Wrong index number!');

    //console.log('before remove: ' + _ProfileDetails.skills);

    _ProfileDetails.skills.splice(index, 1);

    //console.log('after remove: ' + _ProfileDetails.skills);

    const updatedProfileDetails = await ProfileDetails.findByIdAndUpdate(_id, { ..._ProfileDetails }, { new: true });

    res.json(updatedProfileDetails);

    return;
    
};