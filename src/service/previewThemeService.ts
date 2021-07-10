import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

import previewMap from "./previewMap.json";

export default async function previewThemeService(theme: string, userId: string){

    const themeName = previewMap.theme[theme];
    const query = `select count(liked_post.PostId) as favoriteCount, P.postId
                    FROM (SELECT postId FROM post_has_theme WHERE themeName= :theme) AS P
                    LEFT OUTER JOIN liked_post ON(P.postId = liked_post.PostId)
                    GROUP BY P.postId ORDER BY favoriteCount DESC`;

    const result = await db.sequelize.query(query,{ replacements:{theme:themeName},type: QueryTypes.SELECT });
    
    let brief: briefInformationDTO[] = []

    const preview: previewDTO = {
        totalCourse: result.length,
        drive: brief
    };
    try{
        for(let idx in result){
                const postId = result[idx]['postId'];

                const tempBrief: briefInformationDTO = {
                    title: "",
                    image: "",
                    isFavorite: false,
                    tags: [],
                };
  
                const promise1 = new Promise( async (resolve, reject) => {
                    const result = await db.Post.findOne({
                        include:[
                            {
                                model: db.PostHasImage,
                                attributes:['image1']
                            },
                            {
                                model: db.PostHasTags,
                                attributes:['region', 'theme', 'warning']
                            }
                        ],
                        where: { id: postId }, 
                        attributes: ['title'],
                        raw: true
                    })

                    tempBrief.title = result['title'];
                    tempBrief.image = result['PostHasImage.image1'];
                    tempBrief.tags.push(result['PostHasTag.region']);
                    tempBrief.tags.push(result["PostHasTag.theme"]);
                    
                    const warningTag = result["PostHasTag.warning"];
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
                .then(() => { brief.push(tempBrief); })
                .catch(err => { throw err; })
        }
        
        return {
            status: 200,
            data:{
                msg : "successfully load preview based on theme",
                data : preview
            }
        }
        
    }catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                msg : "DB preview loading error"
            }
        }
    } 
    
}