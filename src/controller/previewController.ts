import { Request, Response } from "express";

import { newTrendService, newThemeService, newLocalService } from "../service/newPreviewService";
import { likeLocalService, likeThemeService, likeTrendService } from "../service/likePreviewService"
export async function newPreviewController(req: Request, res: Response){

    try{
        
        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        
        if(identifier == "0"){ // these days preview
            ret = await newTrendService(userId);
        }else if(identifier == "1"){ //theme & custom theme preview 
            ret = await newThemeService(value, userId);
        }else if(identifier == "2"){ // local preview
            ret = await newLocalService(value, userId);
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

export async function likePreviewController(req: Request, res: Response){
    try{
        
        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        
        if(identifier == "0"){ // these days preview
            ret = await likeTrendService(userId);
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