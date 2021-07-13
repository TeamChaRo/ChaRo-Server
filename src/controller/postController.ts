import express, { Request, Response } from "express";

import { likePostService, savePostService } from "../service/postService";

export async function likePostController(req: Request, res: Response){
    const userId = req.body.userId;
    const postId = req.body.postId;

    const ret = await likePostService(userId, postId);
    res.status(ret.status).json(ret.data);
}

export async function savePostController(req: Request, res: Response){
    const userId = req.body.userId;
    const postId = req.body.postId;

    const ret = await savePostService(userId, postId);
    res.status(ret.status).json(ret.data);
}