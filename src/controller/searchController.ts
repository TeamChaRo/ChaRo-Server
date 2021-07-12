import express, { Request, Response } from "express";
import searchDTO from "../interface/req/searchDTO";

/*
likeSearchController
- 좋아요순 검색하기 controller
*/
export async function likeSearchController(req: Request, res: Response) {
    try {
        let searchEntity: searchDTO = {
            region: req.body.region,
            theme: req.body.theme,
            warning: req.body.warning
        };

    } catch {
      res.status(500).json({
        success: false,
        msg: "서버 내부 오류",
      });
    }
  }