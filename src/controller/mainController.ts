import express, { Request, Response } from "express";
import { localMain, themeMain } from "../service/mainService";

export default async(req: Request, res: Response) => {
    // check error 핸들링(필요한가?)

    // local, theme 테이블에서 기준되는 값 불러오기(안만듬) -> in service 에 정의하시게~
    // ex)
    const id = "jieun123";
    const local = "서울특별시"
    const custom = 15; 

    localMain(id, local);
    themeMain(id, custom);
}