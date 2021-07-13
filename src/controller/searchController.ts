
import express, { Request, Response } from "express";
const router = express.Router();
import { likeSearchService } from "../service/likeSearchService";
import { newSearchService } from "../service/newSearchService";
import searchDTO from "../interface/req/searchDTO";
import User from "../models/User";

/*
likeSearchController
- 인기순 검색하기 controller
*/
export async function likeSearchController(req: Request, res: Response) {
    try {
        const userId  = req.body.userId;
        let user = await User.findOne({ 
            where: {
            id : userId,
          }
        });
  
      if (!user) {
        return res.status(404).json({
            success: false,
            msg: "존재하지 않는 유저입니다.",
        });
      }

        let searchEntity: searchDTO = {
            region: req.body.region,
            theme: req.body.theme,
            warning: req.body.warning,
        };
        
        // body값에 아무 값도 들어오지 않았을 때 에러 체크
        if (searchEntity.region.length == 0 && (!searchEntity.theme) && (!searchEntity.warning))  {
            return res.status(404).json({
                success: false,
                msg: "최소 한가지의 검색 조건을 설정해주세요!",
            });
        }

        const likeSearchReturn = await likeSearchService(searchEntity, userId);
        return res.status(likeSearchReturn.status).json(likeSearchReturn.data);
    } 
    catch {
        return res.status(500).json({
            success: false, 
            msg: "서버 내부 오류",
        });
    }
}

/*
newSearchController
- 최신순 검색하기 controller
*/
export async function newSearchController(req: Request, res: Response) {
    try {
        const userId  = req.body.userId;
        let user = await User.findOne({ 
            where: {
            id : userId,
          }
        });
  
      if (!user) {
        return res.status(404).json({
            success: false,
            msg: "존재하지 않는 유저입니다.",
        });
      }

        let searchEntity: searchDTO = {
            region: req.body.region,
            theme: req.body.theme,
            warning: req.body.warning,
        };
        
        // body값에 아무 값도 들어오지 않았을 때 에러 체크
        if (searchEntity.region.length == 0 && (!searchEntity.theme) && (!searchEntity.warning))  {
            return res.status(404).json({
                success: false,
                msg: "최소 한가지의 검색 조건을 설정해주세요!",
            });
        }

        const newSearchReturn = await newSearchService(searchEntity, userId);
        return res.status(newSearchReturn.status).json(newSearchReturn.data);
    } 
    catch {
        return res.status(500).json({
            success: false, 
            msg: "서버 내부 오류",
        });
    }
}