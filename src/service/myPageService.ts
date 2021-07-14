import { db } from "../models";
import { QueryTypes } from 'sequelize';

import { myPageDTO, myPagePreview, myPageUser } from "../interface/res/myPageDTO";


function insertMyPage(query: string, userId: string, posts:myPagePreview[]){
    return new Promise( async (resolve) => {
        await db.sequelize.query(query,{ replacements:{userId:userId},type: QueryTypes.SELECT, raw:true, nest:true })
            .then( ( results ) => { 
                if(results.length == 0) resolve(0);
                results.map( (result) => {
                    const date = (result['date'] as string).split("-");
                    const temp: myPagePreview = {
                        postId: result["id"],
                        title: result["title"],
                        image: result["image1"],
                        tags: [],
                        favoriteNum: result["favoriteCount"],
                        saveNum: result["saveCount"],
                        year: date[0],
                        month: date[1],
                        day: date[2]
                    }

                    temp.tags.push(result["region"]);
                    temp.tags.push(result["theme"]);
                    
                    const warningTag = result["warning"];
                    if(warningTag) temp.tags.push(warningTag);

                    posts.push(temp);
                    
                    if(posts.length == results.length) {
                        resolve(results.length);
                    }
                })
            });
    })

}

export async function likeService(userId: string){
    try{
        let user: myPageUser = {
            nickname: "",
            profileImage: "",
            following: [],
            follower: []
        };
        let writtenPost: myPagePreview[] = [];
        let savedPost: myPagePreview[] = [];

        const myPage: myPageDTO = {
            userInformation: user,
            writtenTotal: 0,
            writtenPost: writtenPost,
            savedTotal: 0,
            savedPost: savedPost
        }


        const userPromise = new Promise( async (resolve, reject) => {

            const userInfo = `SELECT nickname, profileImage FROM user WHERE id=:userId`;
            const result = await db.sequelize.query(userInfo,{ replacements:{userId:userId},type: QueryTypes.SELECT, raw:true, nest:true })
            user.nickname = result[0]['nickname'];
            user.profileImage = result[0]['profileImage'];

            //팔로잉
            const following = `SELECT A.follower AS following
                                FROM user 
                                INNER JOIN follow AS A 
                                WHERE user.id= :userId AND user.id = A.followed`;
            
            // 팔로워
            const follower = `SELECT B.followed AS follower
                                FROM user 
                                INNER JOIN follow AS B
                                WHERE user.id= :userId AND user.id = B.follower`;

            const p1 = new Promise( (resolve)  => {
                db.sequelize.query(following,{ replacements:{userId:userId},type: QueryTypes.SELECT })
                    .then( (results) => {
                        results.map( (result, index) => {       
                            user.following.push(result['following'])
                        });
                        resolve("load following success");
                    })
            });
            
            const p2 = new Promise( async (resolve)  => {
                db.sequelize.query(follower,{ replacements:{userId:userId},type: QueryTypes.SELECT })
                    .then( ( results ) => {
                        results.map( (result) => { 
                            user.follower.push(result['follower'])
                        });
                        resolve("load follower success");
                    })
            });

            await Promise.all([p1, p2]) ;
            resolve("success user promise");
        });

        const writtenQuery = `SELECT P.id, P.title, DATE_FORMAT(P.updatedAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(saved_post.PostId) as saveCount
                            FROM (SELECT id, title, updatedAt FROM post WHERE userId=:userId) as P
                            LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                            LEFT OUTER JOIN saved_post ON(P.id = saved_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 7`;


        const savedQuery =`SELECT P.id, P.title, DATE_FORMAT(P.updatedAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(S.postId) as saveCount
                            FROM (SELECT PostId AS postId FROM saved_post WHERE userId=:userId) as S
                            INNER JOIN post as P
                            LEFT OUTER JOIN liked_post ON(S.postId = liked_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE S.postId=P.id and T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 7`;

        const writtenPostPromise = insertMyPage(writtenQuery, userId, writtenPost);
        const savedPostPromise = insertMyPage(savedQuery, userId, savedPost)
 
        await Promise.all([userPromise, savedPostPromise, writtenPostPromise])
            .then( (response) => {
                const savedCount = response[1] as number;
                const writtenCount = response[2] as number;
                
                myPage.writtenTotal = writtenCount;
                myPage.savedTotal = savedCount;
                
            });

        return {
            status: 200,
            data:{
                success: true,
                msg : "successfully load main view data",
                data : myPage
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


export async function newService(userId: string){
    try{
        let user: myPageUser = {
            nickname: "",
            profileImage: "",
            following: [],
            follower: []
        };
        let writtenPost: myPagePreview[] = [];
        let savedPost: myPagePreview[] = [];

        const myPage: myPageDTO = {
            userInformation: user,
            writtnTotal: 0,
            writtenPost: writtenPost,
            savedTotal: 0,
            savedPost: savedPost
        }

        const userPromise = new Promise( async (resolve, reject) => {

            //팔로잉
            const following = `SELECT A.follower AS following, user.nickname, user.profileImage
                                FROM user 
                                INNER JOIN follow AS A 
                                WHERE user.id= :userId AND user.id = A.followed`;
            
            // 팔로워
            const follower = `SELECT B.followed AS follower
                                FROM user 
                                INNER JOIN follow AS B
                                WHERE user.id= :userId AND user.id = B.follower`;

            const p1 = new Promise( (resolve)  => {
                db.sequelize.query(following,{ replacements:{userId:userId},type: QueryTypes.SELECT })
                    .then( (results) => {
                        results.map( (result, index) => {       
                            if(index == 0){
                                user.nickname = result['nickname'];
                                user.profileImage = result['profileImage'];
                            }
                            user.following.push(result['following'])
                        });
                        resolve("load following success");
                    })
            });
            
            const p2 = new Promise( async (resolve)  => {
                db.sequelize.query(follower,{ replacements:{userId:userId},type: QueryTypes.SELECT })
                    .then( ( results ) => {
                        results.map( (result) => { 
                            user.follower.push(result['follower'])
                        });
                        resolve("load follower success");
                    })
            });

            await Promise.all([p1, p2]) ;
            resolve("success");
        });

        const writtenQuery = `SELECT P.id, P.title, DATE_FORMAT(P.createdAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(saved_post.PostId) as saveCount
                            FROM (SELECT id, title, createdAt FROM post WHERE userId=:userId) as P
                            LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                            LEFT OUTER JOIN saved_post ON(P.id = saved_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY date DESC LIMIT 7`;

        const savedQuery =`SELECT P.id, P.title, DATE_FORMAT(P.createdAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(S.postId) as saveCount
                            FROM (SELECT PostId AS postId FROM saved_post WHERE userId="111") as S
                            INNER JOIN post as P
                            LEFT OUTER JOIN liked_post ON(S.postId = liked_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE S.postId=P.id and T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY date DESC LIMIT 7`;

        const writtenPostPromise = insertMyPage(writtenQuery, userId, writtenPost);
        const savedPostPromise = insertMyPage(savedQuery, userId, savedPost)
 
        await Promise.all([userPromise, writtenPostPromise, savedPostPromise]);

        return {
            status: 200,
            data:{
                success: true,
                msg : "successfully load main view data",
                data : myPage
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