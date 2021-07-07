import { Request, Response } from "express";
import imageUpload  from "./image";

export default async(req: Request, res: Response) => {
    try{

        let upload = imageUpload.postImages("1"); // userId
        upload(req, res, function(err){
            if(err){
                console.log("err!", err);
                return res.status(400).json({
                    "success" : false,
                    "msg" : "File Upload Error, 이미지 6개 제한"
                });
            }
            for(let file of req.files){
                // image path
                let image = (file as Express.MulterS3.File).location;
                console.log(image);
            }
            
            // 완성
            return res.status(200).json({ 
                "success" : true,
                "msg" : "success!"
            })
        })
    }catch(err){
        console.log("err!!!", err);
        return res.status(500).send("Server error");
    }
}
