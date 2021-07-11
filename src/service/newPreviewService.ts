import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

import { makeThemeBriefCollection, makeLocalBriefCollection, makeTrendBriefCollection } from "./briefCollectionService";

/* 
const query = `select count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
                    FROM (SELECT id, title FROM post WHERE region= :region) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
    작성순서
    post_has_image / post_has_tags / post / liked_post 함께

 */

export async function trendService(userId: string){
    
}

export async function themeService(theme: string, userId: string){

}

export async function localService(local: string, userId: string){

}