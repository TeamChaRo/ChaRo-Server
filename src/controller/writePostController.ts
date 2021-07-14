import { Request, Response } from "express";
import writePostDTO from "../interface/req/writePostDTO";
import writePostService from "../service/writePostService";

export default async(req: Request, res: Response) => {
    try{
        const obj = {
            title: '하이',
            userId: 'injeong0418',
            province: '특별시',
            region: '서울',
            theme: [ '여름', '산' ],
            warning: [ 'true', 'true', 'false', 'false' ],
            isParking: 'false',
            parkingDesc: '예원아 새벽까지 고생이 많아',
            courseDesc: '코스 드립크',
            course:{
              address: [ '123', '123' ],
              latitude: [ '123', '123' ],
              longtitude: [ '123', '123' ]
            }
        }
        let warning: boolean[] = [];

        //for(let idx in req.body.warning){
        const rawWarning = obj.warning;
        for(let idx in rawWarning){
            if(rawWarning[idx] == "true") warning.push(true);
            else warning.push(false);
        }
        

        
        // images path
        let imagesPath: string[] = [];
 
        if(req.files){
            for(let file of (req.files as Express.MulterS3.File[] ) ) 
                imagesPath.push((file as Express.MulterS3.File).location);
        }

        let postEntity: writePostDTO = {
            title: req.body.title,
            userId: req.body.userId,
            courseImage: imagesPath,
            
            province: req.body.province,
            region: req.body.region,

            theme: req.body.theme,
            warning: req.body.warning,

            isParking: req.body.isParking,
            parkingDesc: req.body.parkingDesc,

            courseDesc: req.body.courseDesc,

            course: obj.course//req.body.course
        }
        
        const ret = await writePostService(postEntity);
        return res.status(ret.status).json(ret.data);
        

    }catch(err){
        console.log("err!!!", err);
        return res.status(500).send("Server error");
    }
}
