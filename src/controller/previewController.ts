import { Request, Response } from "express";
import previewThemeService from "../service/previewThemeService";
import previewLocalService from "../service/previewLocalService";

export default async(req: Request, res: Response) => {
    try{
        console.log("preview Ctrl", req.params);

        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        
        if(identifier == "0"){ // these days preview
            console.log("theseDays preview")
        }else if(identifier == "1"){ //theme preview
            ret = await previewThemeService(value, userId);
        }else if(identifier == "2"){ // local preview
            ret = await previewLocalService("111", userId);
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