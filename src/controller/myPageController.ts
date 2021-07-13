import express, { Request, Response } from "express";

import myPageService from "../service/myPageService";

export default async(req: Request, res: Response) => {
    
    const userId = req.params.id;

    const ret = await myPageService(userId);
    res.status(ret.status).json(ret.data);
}