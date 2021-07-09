import { Request, Response } from "express";
import previewService from "../service/previewService";
export default async(req: Request, res: Response) => {
    try{
        console.log("preview Ctrl", req.params);
        await previewService();
        return res.status(200).json({
            success: true,
            msg: "성공~"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        })
    }
}