import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import mainService from "../service/mainService";

export default async(req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status : false,
        msg: errors[0].msg
      }
    }
    const { id } = req.params;

    try {
      let user = await User.findOne({ 
        where: {
          id :id,
        },
        attributes : ['id','nickname']
      });

      if (!user) {
        res.status(400).json({
          success: false,
          msg: "미등록된 유저입니다"
        });
      }
      else {
        const getMainService = await mainService(id, "여름", "부산");
        res.status(getMainService.status).json(getMainService.data);
      }
    } 
    catch {
      res.status(500).json({
        success: false,
        msg: "서버 내부 오류"
      });
    }
}
