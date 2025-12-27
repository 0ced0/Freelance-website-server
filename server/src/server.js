import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import route from "./routes/Router.js"
import cors from "cors";
import router from "./routes/Auth.js";

// const uri = "mongodb+srv://nrosscedric_db_user:goodmorning246810@freelance-website.fatvult.mongodb.net/?appName=Freelance-website";


const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();

const PORT = process.env.PORT || 2000;
const my_db = process.env.MONGO_URL

mongoose
    .connect(my_db)
    .then(() => {
        console.log("db connected succesfully")
        app.listen(PORT, () => {
            console.log(`server is running on port : ${PORT}`)
        });
    })
    .catch((error) => console.log(error))


app.use("/api", route);