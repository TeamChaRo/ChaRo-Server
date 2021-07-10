import { Request, Response } from "express";

import { likeLocalService, likeThemeService, likeTodayService } from "../service/likePreviewService"
export default async(req: Request, res: Response) => {
    try{
        
        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        
        if(identifier == "0"){ // these days preview
            ret = await likeTodayService(userId);
            console.log("theseDays preview")
        }else if(identifier == "1"){ //theme & custom theme preview 
            ret = await likeThemeService(value, userId);
        }else if(identifier == "2"){ // local preview
            ret = await likeLocalService(value, userId);
        }
        
        return res.status(ret.status).json(ret.data);

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        })
    }
}