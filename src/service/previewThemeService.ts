import { db } from "../models";
import { QueryTypes } from 'sequelize';

import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

const themeMap = {
    spring: "봄",
    summer: "여름",
    fall: "가을",
    winter: "겨울",
    mountain: "산",
    sea: "바다",
    lake: "호수",
    river: "강",
    oceanRoad: "해안도로",
    blossom: "벚꽃",
    maple: "단풍",
    relax: "여유",
    speed: "스피드",
    nightView: "야경",
    cityView: "도심"
}
export default async function previewThemeService(theme: string){
    console.log("previewService")
    const themeName = themeMap[theme];
    const query = `select count(liked_post.PostId) as favoriteCount, P.postId, count(P.postId) as postCount
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
                    isFavorite: true,
                    tags: [],
                };
            
                // post_has_image 
                const promise1 = new Promise( async (resolve, reject) => {
                    db.PostHasImage.findOne({ where: { postId: postId }, raw: true })
                        .then((ret) => {
                            tempBrief.image = ret["image1"];
                            resolve("success");    
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                })

                // post_has_warning
                const promise2 = new Promise( async (resolve, reject) => {
                    db.Post.findOne({ where: { id: postId }, raw: true })
                        .then((ret) => {
                            tempBrief.title = ret["title"];
                            tempBrief.tags.push(ret["region"]);
                            tempBrief.tags.push(themeName);

                            resolve("success");
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                })

                // liked_post
                const promise3 = new Promise((resolve, reject) => {
                    db.PostHasWarning.findOne({ where: { postId: postId }, raw: true })
                        .then((ret) => {
                            if(ret){
                                tempBrief.tags.push(ret["warningName"]);
                            }
                            resolve("success");
                        })
                        .catch((err)=>{
                            reject(err);
                        });
                })
                
                await Promise.all([promise1, promise2, promise3]) 
                    .then(() => {
                        brief.push(tempBrief);
                    })
                    .catch(err => {
                        throw err;
                    })
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