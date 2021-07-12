import express, { Request, Response } from "express";

import { likePostService } from "../service/postService";

export async function likePostController(req: Request, res: Response){
    const userId = req.params.userId;
    const postId = req.params.postId;


    const ret = await likePostService(userId, postId);
    res.status(ret.status).json(ret.data);
}