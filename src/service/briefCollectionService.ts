import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";

export async function makeLocalBriefCollection(result:object[], briefCollection: briefInformationDTO[], userId:string){
    for(let idx in result){
        const postId = result[idx]['postId'];

        const tempBrief: briefInformationDTO = {
            postId:postId,
            title: result[idx]['title'],
            image: "",
            isFavorite: false,
            tags: [],
        };

        const imageTagQuery = `SELECT I.image1, T.region, T.theme, T.warning
                            FROM post_has_image AS I INNER JOIN post_has_tags AS T
                            WHERE I.postId=:postId and
                            I.postId = T.postId`;

        const isFavoriteQuery = "select UserId from liked_post where PostId = :postId and UserId = :userId";

        const promise1 = db.sequelize.query(imageTagQuery,{ replacements:{postId:postId},type: QueryTypes.SELECT, raw:true, nest:true })
        const promise2 = db.sequelize.query(isFavoriteQuery,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT, raw:true, nest:true });

        await Promise.all([promise1, promise2]) 
            .then( (response) => { 

                const imageAndTag:object = response[0][0];
                if(imageAndTag){
                    tempBrief.image = imageAndTag["image1"];
                    tempBrief.tags.push(imageAndTag["region"]);
                    tempBrief.tags.push(imageAndTag["theme"]);

                    const warningTag = imageAndTag["warning"];
                    if(warningTag) tempBrief.tags.push(warningTag);
                }
                
                if(response[1].length > 0) tempBrief.isFavorite = true;
                briefCollection.push(tempBrief); 
            })
            .catch(err => { throw err; })
            
    }

}

export async function makeTrendBriefCollection(result:object[], briefCollection: briefInformationDTO[], userId:string){
    for(let idx in result){
        const postId = result[idx]['postId'];

        const tempBrief: briefInformationDTO = {
            postId:postId,
            title: result[idx]['title'],
            image: "",
            isFavorite: false,
            tags: [],
        };
 
        const imageTagQuery = `SELECT I.image1, T.region, T.theme, T.warning
                    FROM post_has_image AS I INNER JOIN post_has_tags AS T
                    WHERE I.postId=:postId and
                    I.postId = T.postId`;

        const isFavoriteQuery = "select UserId from liked_post where PostId = :postId and UserId = :userId";

        const promise1 = db.sequelize.query(imageTagQuery,{ replacements:{postId:postId},type: QueryTypes.SELECT, raw:true, nest:true })
        const promise2 = db.sequelize.query(isFavoriteQuery,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT, raw:true, nest:true });

        await Promise.all([promise1, promise2]) 
            .then( (response) => { 

                const imageAndTag:object = response[0][0];
                if(imageAndTag){
                    tempBrief.image = imageAndTag["image1"];
                    tempBrief.tags.push(imageAndTag["region"]);
                    tempBrief.tags.push(imageAndTag["theme"]);

                    const warningTag = imageAndTag["warning"];
                    if(warningTag) tempBrief.tags.push(warningTag);
                }
                
                if(response[1].length > 0) tempBrief.isFavorite = true;
                briefCollection.push(tempBrief); 
            })
            .catch(err => { throw err; })
    }
}

export async function makeThemeBriefCollection(result:object[], briefCollection: briefInformationDTO[], userId:string){
    for(let idx in result){
        const postId = result[idx]['postId'];
        const tempBrief: briefInformationDTO = {
            postId:postId,
            title: "",
            image: "",
            isFavorite: false,
            tags: [],
        };

        const promise1 = db.Post.findOne({
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

        const isFavoriteQuery = "select UserId from liked_post where PostId = :postId and UserId = :userId";
        const promise2 = db.sequelize.query(isFavoriteQuery,{ replacements:{postId:postId, userId:userId},type: QueryTypes.SELECT, raw:true, nest:true });

        await Promise.all([promise1, promise2]) 
            .then( (response) => { 
                const result = response[0];
        
                tempBrief.title = result['title'];
                tempBrief.image = result['PostHasImage']['image1'];
                tempBrief.tags.push(result['PostHasTag']['region']);
                tempBrief.tags.push(result['PostHasTag']['theme']);
                
                const warningTag = result["PostHasTag.warning"];
                if(warningTag) tempBrief.tags.push(warningTag);

                if(response[1].length > 0) tempBrief.isFavorite = true;
                briefCollection.push(tempBrief);
            });

    }
}

export async function makeBriefCollection(result:object[], briefCollection: briefInformationDTO[]){
    for( let idx in result ){
        const postId = result[idx]['id'];

        const tempBrief: briefInformationDTO = {
            postId: postId,
            title: result[idx]['title'],
            image: result[idx]['image1'],
            isFavorite: false,
            tags: [],
        };

        //tags
        tempBrief.tags.push(result[idx]['region']);
        tempBrief.tags.push(result[idx]['theme']);
        const warningTag = result[idx]["warning"];
        if(warningTag) tempBrief.tags.push(warningTag);

        // isFavorite
        const isFavorite = result[idx]["isFavorite"];
        if(isFavorite) tempBrief.isFavorite = true;

        briefCollection.push(tempBrief);
    }
}