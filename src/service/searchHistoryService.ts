import { db } from "../models";
import { QueryTypes } from 'sequelize';

export async function saveHistoryService(){

    return {
        status: 200,
        data:{
            success : true,
            msg : "이걸 보시면 예원이에게 재롱부리고 오시오. 성공 축하합니다^^?",//"successfully save history",
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