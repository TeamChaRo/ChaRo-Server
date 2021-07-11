import express, { Request, Response } from "express";

import { loadHistoryService } from "../service/searchHistoryService";

export default async(req: Request, res: Response) => {

    const result = await loadHistoryService();
    res.status(result.status).json(result.data);
}
 