import { db } from "../models";
import { QueryTypes } from 'sequelize';

import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

export default async function previewThemeService(local: string, userId: string){

    const query = `select count(liked_post.PostId) as favoriteCount, P.id as postId, P.title
                    FROM (SELECT id, title FROM post WHERE region= :region) AS P
                    LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
    
    const result = await db.sequelize.query(query,{ replacements:{region:local},type: QueryTypes.SELECT });

    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };

    try{
        for(let idx in result){
            const postId = result[idx]['postId'];

            const tempBrief: briefInformationDTO = {
                title: result[idx]['title'],
                image: "",
                isFavorite: false,
                tags: [],
            };
            
            const promise1 = new Promise( async (resolve, reject) => {
                const query = `SELECT * 
                                FROM post_has_image INNER JOIN post_has_tags 
                                WHERE post_has_image.postId=:postId and
                                post_has_image.postId = post_has_tags.postId`;
                const result = await db.sequelize.query(query,{ replacements:{postId:postId},type: QueryTypes.SELECT });

                tempBrief.image = result[0]["image1"];
                tempBrief.tags.push(result[0]["region"]);
                tempBrief.tags.push(result[0]["theme"]);

                const warningTag = result[0]["warning"];
                if(warningTag) tempBrief.tags.push(warningTag);

                resolve("success");
            });

            const promise2 = new Promise( async (resolve, reject) => {
                console.log("posIIDI", postId);
                
                const query = "select * from liked_post where PostId = :postId and UserId = :userId";
                const ret = await db.sequelize.query(query,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT });
                if(ret.length > 0) tempBrief.isFavorite = true;
                
                resolve("success");
            });

            await Promise.all([promise1, promise2]) 
                .then(() => { brief.push(tempBrief); })
                .catch(err => { throw err; })
        }

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