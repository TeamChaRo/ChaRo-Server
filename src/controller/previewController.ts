import { Request, Response } from "express";
import previewTodayService from "../service/previewTodayService";
import previewThemeService from "../service/previewThemeService";
import previewLocalService from "../service/previewLocalService";

export default async(req: Request, res: Response) => {
    try{
        
        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        
        if(identifier == "0"){ // these days preview
            ret = await previewTodayService(userId);
            console.log("theseDays preview")
        }else if(identifier == "1"){ //theme & custom theme preview 
            ret = await previewThemeService(value, userId);
        }else if(identifier == "2"){ // local preview
            ret = await previewLocalService(value, userId);
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