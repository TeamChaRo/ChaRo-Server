import { Request, Response } from "express";
import previewThemeService from "../service/previewThemeService";
export default async(req: Request, res: Response) => {
    try{
        console.log("preview Ctrl", req.params);

        let ret:any;
        
        const identifier: string = req.params.identifier;
        const userId: string = req.params.userId;
        const value: string= req.query.value as string
        //theme preview
        if(identifier == "1"){
            ret = await previewThemeService(value, userId);
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