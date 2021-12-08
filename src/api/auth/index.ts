import { Router } from "express";
import { login, logout, refresh, registration } from "./auth.controler";

const route = Router();
export default function (root) {
  root.use("/auth", route);
  route.post("/login", login);
  route.post("/logout", logout);
  route.post("/registration", registration);
  route.get("/refresh", refresh);
}
