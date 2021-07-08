import { Request, Response } from "express";

export default async(req: Request, res: Response) => {
    try{
        console.log("preview Ctrl", req.params);

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