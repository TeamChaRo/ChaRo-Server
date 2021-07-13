import express, { Request, Response } from "express";

import { loadHistoryService } from "../service/searchHistoryService";
import { saveHistoryService } from "../service/searchHistoryService";

import searchHistoryDTO from "../interface/req/searchHistoryDTO";

export async function loadHistoryController(req: Request, res: Response){
    const userId = req.params.id;
    const result = await loadHistoryService(userId);
    res.status(result.status).json(result.data);
}
 
export async function saveHistoryController(req: Request, res: Response){

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
 