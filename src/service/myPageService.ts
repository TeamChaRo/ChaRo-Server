import { db } from "../models";
import { QueryTypes } from 'sequelize';

import { myPageDTO, myPagePreview, myPageUser } from "../interface/res/myPageDTO";

export default async (userId: string) => {
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
            
            resolve("success~1");
        });

        const writtenPostPromise = new Promise( async (resolve, reject) => {

            resolve("success~2");
        });

        const savedPostPromise = new Promise( async (resolve, reject) => {

            resolve("success~3");
        });

        await Promise.all([userPromise, writtenPostPromise, savedPostPromise]);
        return {
            status: 200,
            data:{
                success: true,
                msg : "successfully load main view data",
                //data : main
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