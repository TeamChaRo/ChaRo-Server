import { db } from "../models";
import { QueryTypes } from 'sequelize';

import mainDTO from '../interface/res/mainDTO';
import bannerDTO from "../interface/res/bannerDTO";
import briefInformationDTO from "../interface/res/briefInformationDTO";

import { makeThemeBriefCollection, makeTrendBriefCollection, makeLocalBriefCollection } from "./briefCollectionService";

export default async function mainService(userId: string, theme: string, region: string){
    try{

        let banner: bannerDTO[] = [];
        let today: briefInformationDTO[] = [];
        let trend: briefInformationDTO[] = [];
        let custom: briefInformationDTO[] = [];
        let local: briefInformationDTO[] = [];

        const main: mainDTO = {
            banner: banner,
            todayCharoDrive: today,
            trendDrive: trend,
            customThemeTitle: "",
            customThemeDrive: custom,
            localTitle: "",
            localDrive: local
        }

        // banner
        const bannerPromise = new Promise( async (resolve, reject) => {
            
            const ret = await db.Banner.findAll({limit:4, raw: true, nest : true});

            for(let idx in ret){
                const tempBanner: bannerDTO = {
                    bannerTitle: ret[idx]["bannerTitle"],
                    bannerImage: ret[idx]["bannerImage"],
                    bannerTag: ret[idx]["bannerTag"]
                }
                banner.push(tempBanner);
            }
            resolve("success");
        })
        
        //today-> 추천알고리즘 들어가는데.
        const todayPromise = new Promise( async (resolve, reject) => {
            const query = `select P.id as postId, P.title as title, count(liked_post.PostId) as favoriteCount
                    FROM (SELECT id, title FROM post) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;
                
            const result = await db.sequelize.query(query,{ type: QueryTypes.SELECT, nest : true});

            for(let idx in result){
                const postId = result[idx]['postId'];
    
                const tempBrief: briefInformationDTO = {
                    postId:postId,
                    title: result[idx]['title'],
                    image: "",
                    isFavorite: false,
                    tags: [],
                };
                
                const promise1 = new Promise( async (resolve, reject) => {
                    const query = `SELECT * 
                                    FROM post_has_image INNER JOIN post_has_tags 
                                    WHERE post_has_image.postId=:postId and
                                    post_has_image.postId = post_has_tags.postId `;
                    const result = await db.sequelize.query(query,{ replacements:{postId:postId},type: QueryTypes.SELECT, nest : true });
    
                    tempBrief.image = result[0]["image1"];
                    tempBrief.tags.push(result[0]["region"]);
                    tempBrief.tags.push(result[0]["theme"]);
    
                    const warningTag = result[0]["warning"];
                    if(warningTag) tempBrief.tags.push(warningTag);
    
                    resolve("success");
                });
    
                const promise2 = new Promise( async (resolve, reject) => {
                    
                    const query = "select * from liked_post where PostId = :postId and UserId = :userId";
                    const ret = await db.sequelize.query(query,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT });
                    if(ret.length > 0) tempBrief.isFavorite = true;
                    
                    resolve("success");
                });
    
                await Promise.all([promise1, promise2]) 
                    .then(() => { today.push(tempBrief); })
                    .catch(err => { throw err; })
            }
            resolve("success");
        })

        // trend service => 우선 똑같이하는걸로
        const trendPromise = new Promise( async (resolve, reject) => {
            const query = `select P.id as postId, P.title as title, count(liked_post.PostId) as favoriteCount
                    FROM (SELECT id, title FROM post) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;
                
            const result = await db.sequelize.query(query,{ type: QueryTypes.SELECT, nest : true});
            await makeTrendBriefCollection(result, trend, userId);
            resolve("success");
        })

        // theme 기준
        const themePromise = new Promise( async (resolve, reject) => {
            const customTitle = await db.CustomTheme.findOne({where: {customTheme:theme}, attributes:['customThemeTitle'], raw: true, nest : true} );
            main.customThemeTitle = customTitle['customThemeTitle'];

            const query = `select P.postId, count(liked_post.PostId) as favoriteCount
                    FROM (SELECT postId FROM post_has_theme WHERE themeName= :theme) AS P
                    LEFT OUTER JOIN liked_post ON(P.postId = liked_post.PostId)
                    GROUP BY P.postId ORDER BY favoriteCount DESC LIMIT 4`;

                    const result = await db.sequelize.query(query,{ replacements:{theme:theme},type: QueryTypes.SELECT, nest:true });
                    await makeThemeBriefCollection(result, custom, userId);

            resolve("success");
        });

        // local city
        const localPromise = new Promise( async (resolve, reject) => {
            
            const localTitle = await db.Local.findOne({where: {localCity:region}, raw:true, attributes:['localTitle'], nest: true} );
            main.localTitle = localTitle['localTitle'];

            const query = `select count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
                    FROM (SELECT id, title FROM post WHERE region= :region) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;
            
            const result = await db.sequelize.query(query,{ replacements:{region:region},type: QueryTypes.SELECT });
            await makeLocalBriefCollection(result, local, userId);
    
            resolve("success");
        });
        
        await Promise.all([bannerPromise, todayPromise, trendPromise, themePromise, localPromise]) 
                .catch(err => { throw err; })

        return {
            status: 200,
            data:{
                success: true,
                msg : "successfully load main view data",
                data : main
            }
        }

    }catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                success: false,
                msg : "DB main view loading error"
            }
        }
    }
    
}