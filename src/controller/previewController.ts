import { Request, Response } from "express";
import previewThemeService from "../service/previewThemeService";
export default async(req: Request, res: Response) => {
    try{
        console.log("preview Ctrl", req.params);

        let ret:any;
        
        //theme preview
        if(req.params.identifier == "1"){
            ret = await previewThemeService(req.query.value as string);
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