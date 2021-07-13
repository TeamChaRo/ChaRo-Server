import { db } from "../models";
import { QueryTypes } from 'sequelize';

import { myPageDTO, myPagePreview, myPageUser } from "../interface/res/myPageDTO";


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
        
        const writtenPostPromise = new Promise( async (resolve, reject) => {
            const query = `SELECT P.id, P.title, DATE_FORMAT(P.updatedAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(saved_post.PostId) as saveCount
                            FROM (SELECT id, title, updatedAt FROM post WHERE userId=:userId) as P
                            LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                            LEFT OUTER JOIN saved_post ON(P.id = saved_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 7`;
            
            db.sequelize.query(query,{ replacements:{userId:userId},type: QueryTypes.SELECT })
                .then( ( results ) => { 
                    results.map( (result) => {
                        //console.log(result)
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

                        writtenPost.push(temp);
                        
                        if(writtenPost.length == results.length) resolve("success~2");
                    })
                });
        });

        const savedPostPromise = new Promise( async (resolve, reject) => {

            const query = `SELECT P.id, P.title, DATE_FORMAT(P.updatedAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(S.postId) as saveCount
                            FROM (SELECT PostId AS postId FROM saved_post WHERE userId="111") as S
                            INNER JOIN post as P
                            LEFT OUTER JOIN liked_post ON(S.postId = liked_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE S.postId=P.id and T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 7`;
            
            db.sequelize.query(query,{ replacements:{userId:userId},type: QueryTypes.SELECT })
                .then( ( results ) => { 
                    results.map( (result) => {
                        //console.log(result)
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

                        savedPost.push(temp);
                        
                        if(savedPost.length == results.length) resolve("success~2");
                    })
                });
        
        });

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