import express, { Request, Response } from "express";

import myPageService from "../service/myPageService";

export default async(req: Request, res: Response) => {

    const ret = await myPageService();
    res.status(ret.status).json(ret.data);
}