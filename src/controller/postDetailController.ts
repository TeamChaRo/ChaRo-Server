import { Request, Response } from "express";
import Post from "../models/Post";
import postDetailService from "../service/postDetailService";

export default async(req: Request, res: Response) => {

    console.log("시작")
    
    const { postId } = req.params;
    console.log("postId,", postId)

    try {
        let post = await Post.findOne({ 
            where: {
                id :postId,
            },
        });

        if (!post) {
            res.status(400).json({
            success: false,
            msg: "파라미터값이 올바르지 않습니다."
            });
        }
        else {
            let getPostDetailService = await postDetailService(postId);
            return res.status(getPostDetailService.status).json(getPostDetailService.data);
        }
    } 
    catch {
        res.status(500).json({
            success: false,
            msg: "서버 내부 오류"
        });
    }
}