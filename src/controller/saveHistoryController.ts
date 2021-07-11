import express, { Request, Response } from "express";

import { saveHistoryService } from "../service/searchHistoryService";

export default async(req: Request, res: Response) => {

    const result = await saveHistoryService();
    res.status(result.status).json(result.data);
}
 