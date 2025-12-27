import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: { type: String, default: "" },
    bio: { type: String, default: "" },
    skills: { type: [String], default: "" },
    visits: { type: Number, default: 0 }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User