import { db } from "../models";
import { QueryTypes, Sequelize } from 'sequelize';

import searchHistoryDTO from "../interface/req/searchHistoryDTO";

function insertFunction(entity: searchHistoryDTO){
    return new Promise((resolve) => {
        db.SearchHistory.findOne({ where: { userId:entity.userId, address:entity.address }, raw:true })
            .then( async (ret) => {
                if(!ret){
                    console.log("insert", entity.title);
                    await db.SearchHistory.create(entity);
                    resolve(entity.title);
                }else{
                    await db.SearchHistory.update(
                        { userId: ret.userId }, 
                        { where : { userId:ret.userId, address:ret.address}} );
                    resolve(entity.title);
                }
                
            });
    })
}

export function saveHistoryService(history: searchHistoryDTO[]){
    
    try{
        const promises = [];
        
        for(let idx in history){
            promises.push(insertFunction(history[idx]));
        }
        
        Promise.all(promises);

        return {
            status: 200,
            data:{
                success : true,
                msg : "이걸 보시면 예원이에게 재롱부리고 오시오. 성공 축하합니다^^?",//"successfully save history",
            }
        }

    }catch(err){
        console.log(err);
        return {
            status: 400,
            data:{
                success: false,
                msg : "DB update fail"
            }
        }
    }
    
}

export async function loadHistoryService(){

    return {
        status: 200,
        data:{
            success : true,
            msg : "아 성공~ 오예원한테 가서 먹을거 주고오삼",//"successfully load history",
        }
    }
}