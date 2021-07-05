import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
const router = express.Router();
import signIn from "../service/signInService"


export default async (req: Request, res: Response) => {
        const errors = validationResult(req);
        // check문 에러 핸들링 부분
        if (!errors.isEmpty()) {
          return res.status(400).json({ 
            status : 400,
            //message : errors.array[], // 에러 핸들링 고민 필요!
          });
        }
        const { id, password } = req.body;
        const signInService = await signIn(id, password);
        console.log("ddd",signInService);
        return res.status(signInService.status).json(signInService.data);
      } 
