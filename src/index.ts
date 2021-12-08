import express, { json, Request, Response } from "express";
import { createConfig, EnvConfig } from "./config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRouter from "./api";
import { HttpError } from "./service/helpers";

const app = express();
app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(`/api`, rootRouter());
app.use("/", (err: HttpError, req: Request, res: Response) => {
  res.status(err?.statusCode || 400).json(err.message);
});
createConfig();
(async function () {
  try {
    await mongoose.connect(EnvConfig.MONGO_DB_URI);
    app.listen(EnvConfig.PORT, () =>
      console.log(`App started on port ${EnvConfig.PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
})();
