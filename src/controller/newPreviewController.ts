import { Request, Response } from "express";

import { trendService, themeService, localService } from "../service/newPreviewService";
export default async(req: Request, res: Response) => {

    try{
        
        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        
        if(identifier == "0"){ // these days preview
            ret = await trendService(userId);
        }else if(identifier == "1"){ //theme & custom theme preview 
            ret = await themeService(value, userId);
        }else if(identifier == "2"){ // local preview
            ret = await localService(value, userId);
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