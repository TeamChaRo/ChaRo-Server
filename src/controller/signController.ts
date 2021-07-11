import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
const router = express.Router();
import signIn from "../service/signInService"


export async function signInController (req: Request, res: Response) {
  console.log("asfaf")
  const errors = validationResult(req);
    // check문 에러 핸들링 부분
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status : 400,
        //message : errors.array[], // 에러 핸들링 고민 필요!
      });
    }
    const { id, password } = req.body;
    console.log("id", id, "password", password)
    const signInService = await signIn(id, password);
    console.log("ddd",signInService);
    return res.status(signInService.status).json(signInService.data);
}

export async function signUpController (req: Request, res: Response) {
  console.log("signUp")
  
}

export async function checkIdController (req: Request, res: Response) {
  console.log("checkId")
}

export async function checkNicknameController (req: Request, res: Response) {
  console.log("checkNickname")
}