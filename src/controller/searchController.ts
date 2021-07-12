
import express, { Request, Response } from "express";
const router = express.Router();
import { rtwSearchService } from "../service/likeSearchService";
import searchDTO from "../interface/req/searchDTO";
import User from "../models/User";

/*
likeSearchController
- 좋아요순 검색하기 controller
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

        console.log(!searchEntity.theme)
        console.log(searchEntity.region.length == 0)
        console.log(!searchEntity.warning)
        
        // body값에 아무 값도 들어오지 않았을 때 에러 체크
        if (searchEntity.region.length == 0 && (!searchEntity.theme) && (!searchEntity.warning))  {
            return res.status(404).json({
                success: false,
                msg: "최소 한가지의 검색 조건을 설정해주세요!",
            });
        }

        if ((searchEntity.region.length != 0) && (searchEntity.theme) && (!searchEntity.warning)) {
            console.log("지역+테마")
        }
        else if ((searchEntity.region.length != 0) && (!searchEntity.theme) && (searchEntity.warning)) {
            console.log("지역+주의사항")
        }
        else if ((searchEntity.region.length == 0) && (searchEntity.theme) && (searchEntity.warning)) {
            console.log("테마+주의사항")
        }
        else if ((searchEntity.region.length != 0) && (!searchEntity.theme) && (!searchEntity.warning)) {
            console.log("지역만")
        }
        else if ((searchEntity.region.length == 0) && (searchEntity.theme) && (!searchEntity.warning)) {
            console.log("테마만")
        }
        else if ((searchEntity.region.length == 0) && (!searchEntity.theme) && (searchEntity.warning)) {
            console.log("주의사항만")
        }
        else {
            console.log("지역+테마+주의사항")
            const likeSearchReturn = await rtwSearchService(searchEntity, userId);
            return res.status(likeSearchReturn.status).json(likeSearchReturn.data);
        }

    } catch {
        return res.status(500).json({
        success: false,
        msg: "서버 내부 오류",
      });
    }
  }