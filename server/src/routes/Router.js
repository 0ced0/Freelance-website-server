import { newJob, getJobs, latestJobs } from "../controllers/JobsController.js";
import { fetchFreeLancers, registerUser } from "../controllers/UsersControllers.js";
import { loginUser, checkUser, registerFreeLancer, profileVisit, updateFreeLancer, fetchPopularFreeLancers } from "../controllers/UsersControllers.js";
import express from "express";
const route = express.Router();

route.post("/login", loginUser)
route.post("/register", registerUser)
route.post("/jobs", newJob)
route.get("/jobs", getJobs)
route.get("/auth/me", checkUser)
route.get("/latestJobs", latestJobs)
route.get("/fetchFreeLancers", fetchFreeLancers)
route.post("/registerFreeLancer", registerFreeLancer)
route.patch("/:id/visit", profileVisit)
route.put("/freelancers/:id", updateFreeLancer)
route.get("/fetchFreeLancers/popular", fetchPopularFreeLancers)

export default route  