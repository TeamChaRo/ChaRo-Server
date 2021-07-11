import express, { Request, Response } from "express";

import { saveHistoryService } from "../service/searchHistoryService";

import searchHistoryDTO from "../interface/req/searchHistoryDTO";

export default async(req: Request, res: Response) => {

    const userId = req.body.userId;
    const history = req.body.searchHistory;

    let historyEntity: searchHistoryDTO[] = []
    for(let idx in history){
        const entity: searchHistoryDTO = {
            userId: userId,
            title: history[idx].title,
            address: history[idx].address,
            latitude: history[idx].latitude,
            longitude: history[idx].longitude
        };
        historyEntity.push(entity);
    }
    
    const result = await saveHistoryService(historyEntity);
    res.status(result.status).json(result.data);
}
 