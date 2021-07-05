import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
const router = express.Router();
import signup from "../service/signInService"


export default async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return {
            status : 400,
            message: errors[0].message
          }
          //return res.status(400).json({ errors: errors.array() });
        }
        const { id, password } = req.body;
        const signupService = await signup(id,password);
        return res.status(signupService.status).json(signupService.data);
      } 
