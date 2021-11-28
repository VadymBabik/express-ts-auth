import { Router } from "express";
import authRouter from "./auth"
export default () => {
    const router = Router();
    authRouter(router);
    return router;
};