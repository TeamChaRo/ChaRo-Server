import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

import previewMap from "./previewMap.json";

import { makeThemeBriefCollection, makeLocalBriefCollection, makeTrendBriefCollection } from "./briefCollectionService";

export async function localService(local: string, userId: string){

    const regionName = previewMap.region[local];

    const query = `select count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
                    FROM (SELECT id, title FROM post WHERE region= :region) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
    
    const result = await db.sequelize.query(query,{ replacements:{region:regionName},type: QueryTypes.SELECT });

    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };

    try{
        await makeLocalBriefCollection(result, brief, userId);
        return {
            status: 200,
            data:{
                success : true,
                msg : "successfully load preview based on local city",
                data : preview
            }
        }

    }catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                success : false,
                msg : "DB preview loading error"
            }
        }
    }
}

export async function themeService(theme: string, userId: string){

    const themeName = previewMap.theme[theme];
    const query = `select P.postId, count(liked_post.PostId) as favoriteCount
                    FROM (SELECT postId FROM post_has_theme WHERE themeName= :theme) AS P
                    LEFT OUTER JOIN liked_post ON(P.postId = liked_post.PostId)
                    GROUP BY P.postId ORDER BY favoriteCount DESC LIMIT 20`;

    const result = await db.sequelize.query(query,{ replacements:{theme:themeName},type: QueryTypes.SELECT });
    
    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };
    try{
        await makeThemeBriefCollection(result, brief, userId);
        return {
            status: 200,
            data:{
                success : true,
                msg : "successfully load preview based on theme",
                data : preview
            }
        }
        
    }catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                success : false,
                msg : "DB preview loading error"
            }
        }
    } 
    
}

export async function trendService(userId: string){

    const query = `select P.id as postId, count(liked_post.PostId) as favoriteCount
                    FROM (SELECT id, title FROM post) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
                
    const result = await db.sequelize.query(query,{ type: QueryTypes.SELECT });
    
    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };
    
    try{
        await makeTrendBriefCollection(result, brief, userId);
        return {
            status: 200,
            data:{
                success : true,
                msg : "successfully load preview based on Today's Charo",
                data : preview
            }
        }

    }catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                success : false,
                msg : "DB preview loading error"
            }
        }
    }

}