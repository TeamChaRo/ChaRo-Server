import { Request, Response } from "express";
import modifyPostService from "../service/modifyPostService";
import writePostDTO from "../interface/req/writePostDTO";

export default  async(req: Request, res: Response) => {
    const postId = req.body.postId;
    
    // images path
    let imagesPath: string[] = [];
 
    if(req.files){
        for(let file of (req.files as Express.MulterS3.File[] ) ) 
            imagesPath.push((file as Express.MulterS3.File).location);
    }

    let warning: boolean[] = [];

    const rawWarning = req.body.warning;
    for(let idx in rawWarning){
        if(rawWarning[idx] == "true") warning.push(true);
        else warning.push(false);
    }

    let postEntity: writePostDTO = {
        title: req.body.title,
        userId: req.body.userId,
        courseImage: imagesPath,
        
        province: req.body.province,
        region: req.body.region,

        theme: req.body.theme,
        warning: warning,

        isParking: req.body.isParking,
        parkingDesc: req.body.parkingDesc,

        courseDesc: req.body.courseDesc,

        course: req.body.course
    }
    
    const ret = await modifyPostService(postId, postEntity);
    res.status(ret.status).json(ret.data);

}