import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
const router = express.Router();
import signup from "../service/signInService"


export default async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const signupService = await signup(email,password);
        return res.status(signupService.status).json(signupService.data);
      } 
