import { Request, Response } from "express";

export function wrapper(func: Function) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      await func.apply(this, arguments);
    } catch (err) {
      next(err);
    }
  };
}

export class HttpError extends Error {
  public statusCode: number;
  constructor(message?: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
