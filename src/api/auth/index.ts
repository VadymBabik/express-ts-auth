import { Router } from "express";
import {login, registration} from "./auth.controler";

const route = Router();
export default function (root) {
    root.use("/auth", route);
    route.get("/login", login);
    route.post("/registration", registration);
}
