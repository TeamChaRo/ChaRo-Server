import express, { Request, Response } from "express";

import { loadHistoryService } from "../service/searchHistoryService";

export default async(req: Request, res: Response) => {
    const userId = req.body.userId;

    const result = await loadHistoryService(userId);
    res.status(result.status).json(result.data);
}
 