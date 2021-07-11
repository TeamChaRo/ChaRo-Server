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
                msg: "홍콩 풍수전문가에 의하면 올해 2월과같은달은 우리인생에서 다시오지 않는다 합니다. 왜냐하면 월요일이4일,", //"successfully load Today's preview sorted by date",
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
                msg: "이 편지는 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다.",//"successfully load Theme preview sorted by date",
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
                msg: "이 것을 받았으니 당신이 행운을 가질 차례이다.유머가 아니며 당신의 행운이메일과 인터넷을 통하여 올 것이다.",//"successfully load Region preview sorted by date",
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