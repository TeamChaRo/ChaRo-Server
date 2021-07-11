import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

import previewMap from "./previewMap.json";

import { makeBriefCollection} from "./briefCollectionService";

export async function trendService(userId: string){
    const query = `select P.id, P.title, T.region, T.theme, T.warning, I.image1, liked_post.PostId as isFavorite
                    FROM (SELECT id, title FROM post) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId and liked_post.UserId = :userId)
                    INNER JOIN post_has_image as I
                    INNER JOIN post_has_tags as T 
                    ON(T.postId = I.postId and T.postId = P.id) LIMIT 20`;
    
    const result = await db.sequelize.query(query,{ replacements:{userId:userId},type: QueryTypes.SELECT });

    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };
    try{
        makeBriefCollection(result, brief);
        return {
            status: 200,
            data: {
                success: true,
                msg: "successfully load Today's preview sorted by date",
                data: preview
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
    const query = `select P.id, P.title, T.region, T.theme, T.warning, I.image1,liked_post.PostId as isFavorite
                    FROM (SELECT id, title FROM post) AS P
                    INNER JOIN post_has_theme as Theme ON(Theme.themeName=:theme and Theme.postId = P.id)
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId and liked_post.UserId = :userId)
                    INNER JOIN post_has_image as I
                    INNER JOIN post_has_tags as T 
                    ON(T.postId = I.postId and T.postId = P.id) LIMIT 20`;
                    
    const result = await db.sequelize.query(query,{ replacements:{userId:userId, theme:themeName},type: QueryTypes.SELECT });

    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };

    try{
        makeBriefCollection(result, brief);
        return {
            status: 200,
            data: {
                success: true,
                msg: "successfully load Theme preview sorted by date",
                data: preview
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

export async function localService(local: string, userId: string){
    const regionName = previewMap.region[local];
    const query = `select P.id, P.title, T.region, T.theme, T.warning, I.image1,liked_post.PostId as isFavorite
                    FROM (SELECT id, title FROM post WHERE region= :region) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId and liked_post.UserId = :userId)
                    INNER JOIN post_has_image as I
                    INNER JOIN post_has_tags as T 
                    ON(T.postId = I.postId and T.postId = P.id) LIMIT 20`;
                    
    const result = await db.sequelize.query(query,{ replacements:{userId:userId, region:regionName},type: QueryTypes.SELECT });
    
    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };

    try{
        makeBriefCollection(result, brief);
        return {
            status: 200,
            data: {
                success: true,
                msg: "successfully load Region preview sorted by date",
                data: preview
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