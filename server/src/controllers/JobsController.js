import Jobs from "../models/JobsDB.js";


export const displayJobs = async (req, res) => {
    try {
        const job = await Jobs.find()
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({ messaage: "Something went wrong" })
    }
}

export const newJob = async (req, res) => {
    try {
        const newJob = await Jobs.create(req.body)
        res.status(201).json(newJob);
    }
    catch (error) {
        res.status(500).json({ message: "failed to submit", error: error.message })
    }
};

export const getJobs = async (req, res) => {
    try {
        const allJobs = await Jobs.find()
        if (!allJobs || allJobs.length === 0)
            return res.status(404).json("No jobs available")
        res.status(200).json(allJobs)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const latestJobs = async (req, res) => {
    try {
        const latestJobs = await Jobs.aggregate([
            { $sort: { createdAt: -1 } }
        ])
        res.status(200).json(latestJobs)
    } catch (error) {
        console.log(error)
    }
}