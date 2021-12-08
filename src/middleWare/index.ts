import { HttpError } from "../service/helpers";
import { Request, Response } from "express";

export const errorMiddleWare = (
  err: HttpError,
  req: Request,
  res: Response
) => {
  console.log(err);
  if (err instanceof HttpError) {
    res.status(err?.statusCode || 400).json(err.message);
  }
  return res.status(500).json("Some error server");
};
