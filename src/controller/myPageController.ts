import express, { Request, Response } from "express";

import { likeService } from "../service/myPageService";

export default async(req: Request, res: Response) => {
    
    const userId = req.params.id;

    const ret = await likeService(userId);
    res.status(ret.status).json(ret.data);
}