import { Response, Request } from "express";
import {
  loginUser,
  logoutUser,
  refreshTokenUser,
  registrationUser,
} from "./auth.service";
import { wrapper } from "../../service/helpers";

export const login = wrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  res.cookie("refreshToken", user.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }); //for https --> secure
  res.status(200).send(user);
});

export const registration = wrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await registrationUser(email, password);
  res.cookie("refreshToken", user.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }); //for https --> secure
  res.status(201).send(user);
});

export const logout = wrapper(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  await logoutUser(refreshToken);
  res.clearCookie("refreshToken");
  res.status(200).send("Ok");
});

export const refresh = wrapper(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const user = await refreshTokenUser(refreshToken);
  res.cookie("refreshToken", user.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }); //for https --> secure
  res.status(200).send(user);
});
