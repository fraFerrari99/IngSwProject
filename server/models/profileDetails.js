import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    id: { type: String },
    skills: { type: String },
    profilePicture: { type: String },
    backgroundPicture: { type: String },
    owner: { type: String, required: true }
});

export default mongoose.model("ProfileDetails", profileSchema);