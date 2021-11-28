import express, {json, Request, Response} from 'express';
import {createConfig, EnvConfig} from "./config";
import mongoose from "mongoose"
import cors from "cors";
import rootRouter from "./api"


const app = express();
app.use(cors());
app.use(json());
app.use(`/api`, rootRouter());
createConfig();
(async function (){
    try {
        await mongoose.connect(EnvConfig.MONGO_DB_URI)
        app.listen(EnvConfig.PORT, () =>
            console.log(`App started on port ${EnvConfig.PORT}...`))
    }catch (error){
        console.log(error)
    }
})()
