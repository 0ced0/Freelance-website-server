import mongoose from "mongoose";

const freeLancerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bio: { type: String, required: true },
    skills: { type: [String], required: true },
    visits: { type: Number, default: 0 }
}, { timestamps: true })

const freeLancers = mongoose.model("freelancer", freeLancerSchema);

export default freeLancers;