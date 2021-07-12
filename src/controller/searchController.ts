import express, { Request, Response } from "express";
import searchDTO from "../interface/req/searchDTO";

/*
likeSearchController
- 좋아요순 검색하기 controller
*/
export async function likeSearchController(req: Request, res: Response) {
    try {

        const { region, theme, warning } = req.body

        // body값에 아무 값도 들어오지 않았을 때 에러 체크
        if (region == null && theme == null && warning == null)  {
            res.status(404).json({
                success: false,
                msg: "최소 한가지의 검색 조건을 설정해주세요!",
            });
        }

    } catch {
      res.status(500).json({
        success: false,
        msg: "서버 내부 오류",
      });
    }
  }