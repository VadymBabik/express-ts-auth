import {Response,Request} from "express";
import {registrationUser} from "./auth.service";

export const login=async (req:Request, res:Response)=>{
    res.status(200).send("Ok")
}

export const registration=async (req:Request, res:Response)=>{
    const {password,email}=req.body
    const user =await registrationUser(password,email)

    res.status(200).send(user)
}