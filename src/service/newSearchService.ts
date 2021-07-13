import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import searchDTO from "../interface/req/searchDTO";
import { makeLocalBriefCollection } from "./briefCollectionService"
import previewDTO from "../interface/res/previewDTO";

//최신순 검색 서비스
export async function newSearchService(searchDTO: searchDTO, userId: string){
    var searchRet: object[]

    if ((searchDTO.region.length != 0) && (searchDTO.theme) && (!searchDTO.warning)) {
        //지역 + 테마 파싱하는 쿼리 
        const regionThemeQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme)
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;

        searchRet = await db.sequelize.query(regionThemeQuery,{ replacements:{ region: searchDTO.region, theme: searchDTO.theme },type: QueryTypes.SELECT });
    }
    else if ((searchDTO.region.length != 0) && (!searchDTO.theme) && (searchDTO.warning)) {
        //지역 + 주의사항 파싱하는 쿼리 
        const regionWarningQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_warning
        WHERE post_has_warning.warningName = :warning AND post_has_warning.postId = P.id)
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;
        searchRet = await db.sequelize.query(regionWarningQuery,{ replacements:{ region: searchDTO.region, warning: searchDTO.warning },type: QueryTypes.SELECT });
    }
    else if ((searchDTO.region.length == 0) && (searchDTO.theme) && (searchDTO.warning)) {
        //테마 + 주의사항 파싱하는 쿼리 
        const themeWarningQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme, post_has_warning
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme AND post_has_warning.warningName = :warning and post_has_warning.postId = P.id
        )
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;
        searchRet = await db.sequelize.query(themeWarningQuery,{ replacements:{ theme: searchDTO.theme, warning: searchDTO.warning },type: QueryTypes.SELECT });
    }
    else if ((searchDTO.region.length != 0) && (!searchDTO.theme) && (!searchDTO.warning)) {
        //지역만 파싱하는 쿼리
        const regionQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;
        searchRet = await db.sequelize.query(regionQuery,{ replacements:{ region: searchDTO.region },type: QueryTypes.SELECT });
    }
    else if ((searchDTO.region.length == 0) && (searchDTO.theme) && (!searchDTO.warning)) {
        //테마만 파싱하는 쿼리
        const themeQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme
        WHERE post_has_theme.themeName = :theme AND post_has_theme.postId = P.id)
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;
        searchRet = await db.sequelize.query(themeQuery,{ replacements:{ theme: searchDTO.theme },type: QueryTypes.SELECT });
    }
    else if ((searchDTO.region.length == 0) && (!searchDTO.theme) && (searchDTO.warning)) {
        //주의사항만 파싱하는 쿼리
        const warningQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_warning
        WHERE post_has_warning.warningName = :warning AND post_has_warning.postId = P.id)
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;
        searchRet = await db.sequelize.query(warningQuery,{ replacements:{ warning: searchDTO.warning },type: QueryTypes.SELECT });
    }
    else {
        //검색어가 3개일 때 쿼리 
        console.log("ㅇㅇㅇㅇㅇ")
        const rtwSearchQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme, post_has_warning
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme AND post_has_warning.warningName = :warning and post_has_warning.postId = P.id
        )
        GROUP BY P.id ORDER BY P.id DESC LIMIT 20`;
        searchRet = await db.sequelize.query(rtwSearchQuery,{ replacements:{ region: searchDTO.region, theme: searchDTO.theme, warning: searchDTO.warning },type: QueryTypes.SELECT });
    }
    
    let brief: briefInformationDTO[] = []

    const searchInfo: previewDTO = {
        totalCourse: searchRet.length,
        drive: brief
    };

    try{
        await makeLocalBriefCollection(searchRet, brief, userId);
        return {
            status: 200,
            data:{
                success : true,
                msg : "최신순 검색뷰 통신에 성공한 당신, 제법 천재군요 :-)",
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