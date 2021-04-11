import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    id: String ,
    skills: [String] ,
    profilePicture: String ,
    backgroundPicture: String ,
    owner: String,
});

export default mongoose.model("ProfileDetails", profileSchema);