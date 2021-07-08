import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
//import { themeMain, themeStandard } from "../service/mainService";
import getMain from "../service/mainService"

export default async(req: Request, res: Response) => {
    // check error 핸들링(필요한가?)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status : 400,
        //message: errors[0].message
      }
    }
    const { id } = req.body;

    // localStandard().then ( local => {
    //     localMain(id, local.localCity)
    // });

    // themeStandard().then ( theme => {
    //     themeMain(id, theme.standardTheme).then( res => {
    //        // responseFunc()
    //     });
 //   })

    const getMainService = await getMain(id);

    res.status(200).json({
            status: true,
            message: "메인뷰 조회 성공",
            data: getMainService.data
    });
}
