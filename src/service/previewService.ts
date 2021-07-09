import { db } from "../models";
import { QueryTypes } from 'sequelize';

import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

export default async function previewService( ){
    console.log("previewService");

    let temp = [];
    const query = "select postId from post_has_theme where theme1=:theme";
    const result = await db.sequelize.query(query,{ replacements:{theme:"여름"},type: QueryTypes.SELECT });
    
    
    result.forEach(async (value, index)=>{
        // 이 안에서 프라미스 배열 처리
        const postId = value['postId'];
        console.log(postId)
        
        let brief: briefInformationDTO[] = []
        
        // post_has_image 
        const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(index);
            }, Math.floor(Math.random() * 1000));
        })

        // post_has_warning
        const promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(index);
            }, Math.floor(Math.random() * 1000));
        })

        // liked_post
        const promise3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(index);
            }, Math.floor(Math.random() * 1000));
        })
        
        await Promise.all([promise1, promise2, promise3]) 
            .then(result => {
                temp.push(result);
            })
            .finally(() => {
                if(temp.length == result.length){
                    console.log("final~~", temp);
                }
            })
    })
    
}