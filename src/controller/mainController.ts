import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
//import { themeMain, themeStandard } from "../service/mainService";
import User from "../models/User"
import getMain from "../service/mainService"

export default async(req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status : false,
        msg: errors[0].msg
      }
    }
    const { id } = req.params;
    console.log("id,", id)

    try {
      let user = await User.findOne({ 
        where: {
          id :id,
        },
        attributes : ['id','nickname']
      });

      if (!user) {
        res.status(400).json({
          status: false,
          message: "미등록된 유저입니다"
        });
      }
      else {
        const getMainService = await getMain(id);
        res.status(200).json({
          status: true,
          message: "메인뷰 조회 성공",
          data: getMainService.data
        });
      }
    } 
    catch {
      res.status(500).json({
        status: false,
        message: "Server Error"
      });
    }
}
