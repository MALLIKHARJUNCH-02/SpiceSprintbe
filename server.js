
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import log from "console";
import error from "console";


const app = express();
import authRoutes from "./routes/signup.js";

app.use(cors({
  origin: 'https://spice-sprint.vercel.app/'
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb is Connected"))
    .catch(error => console.log("❌ MongoDB connection error:", error))


app.get('/',(req, res)=>{
    res.redirect('http://localhost:3000')
});


app.use("/api/auth", authRoutes);

const Port = 5000;
app.listen(Port, ()=>{
    console.log(`✅ Server running at http://localhost:${Port}`)
});