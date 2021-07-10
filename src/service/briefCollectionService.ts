import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";

export async function makeLocalBriefCollection(result:object[], briefCollection: briefInformationDTO[], userId:string){
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

            const query = "select * from liked_post where PostId = :postId and UserId = :userId";
            const ret = await db.sequelize.query(query,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT });
            if(ret.length > 0) tempBrief.isFavorite = true;
            
            resolve("success");
        });

        await Promise.all([promise1, promise2]) 
            .then(() => { briefCollection.push(tempBrief); })
            .catch(err => { throw err; })
    }
}

export async function makeTrendBriefCollection(result:object[], briefCollection: briefInformationDTO[], userId:string){
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
            
            const query = "select * from liked_post where PostId = :postId and UserId = :userId";
            const ret = await db.sequelize.query(query,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT });
            if(ret.length > 0) tempBrief.isFavorite = true;
            
            resolve("success");
        });

        await Promise.all([promise1, promise2]) 
            .then(() => { briefCollection.push(tempBrief); })
            .catch(err => { throw err; })
    }
}

export async function makeThemeBriefCollection(result:object[], briefCollection: briefInformationDTO[], userId:string){
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
                raw: true,
                nest : true
            })

            tempBrief.title = result['title'];
            tempBrief.title = result['title'];
            tempBrief.image = result['PostHasImage']['image1'];
            tempBrief.tags.push(result['PostHasTag']['region']);
            tempBrief.tags.push(result['PostHasTag']['theme']);
            
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
        .then(() => { briefCollection.push(tempBrief); })
        .catch(err => { throw err; })
    }
}