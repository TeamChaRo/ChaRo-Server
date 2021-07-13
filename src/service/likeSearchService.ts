import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import searchDTO from "../interface/req/searchDTO";
import { makeLocalBriefCollection } from "./briefCollectionService"
import previewDTO from "../interface/res/previewDTO";

//검색어가 3개모두일 때 서비스
export async function rtwSearchService(searchDTO: searchDTO, userId: string){

    //검색어가 3개일 때 쿼리 
    const rtwSearchQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme, post_has_warning
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme AND post_has_warning.warningName = :warning and post_has_warning.postId = P.id
        )
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
    const rtwSearchRet = await db.sequelize.query(rtwSearchQuery,{ replacements:{ region: searchDTO.region, theme: searchDTO.theme, warning: searchDTO.warning },type: QueryTypes.SELECT });
        
        
    let brief: briefInformationDTO[] = []

    const searchInfo: previewDTO = {
        totalCourse: rtwSearchRet.length,
        drive: brief
    };

    try{
        await makeLocalBriefCollection(rtwSearchRet, brief, userId);
        return {
            status: 200,
            data:{
                success : true,
                msg : "하이 ",
                data : searchInfo
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