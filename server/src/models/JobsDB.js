import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true }
}, { timestamps: true });

const Jobs = mongoose.model("Job", JobsSchema)

export default Jobs;
