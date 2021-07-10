import { db } from "../models";
import writePostDTO from "../interface/req/writePostDTO";
import postDTO from "../interface/req/postDTO";
import courseDTO from "../interface/req/courseDTO";
import warningDTO from "../interface/req/warningDTO";
import themeDTO from "../interface/req/themeDTO";
import imageDTO from "../interface/req/imageDTO";

const warningMap = {
    0: "고속도로",
    1: "산길포함",
    2: "초보힘듦",
    3: "사람많음"
}

export default async function writePostService( postEntity: writePostDTO ){
    
    /*
    const image: imageDTO = {
        image1: postEntity.courseImage[0]
    }

    let imageSize = postEntity.courseImage.length;
    if(imageSize > 1){
        image.image2 = postEntity.courseImage[1];
        if(imageSize > 2){
            image.image3 = postEntity.courseImage[2];
            if(imageSize > 3){
                image.image4 = postEntity.courseImage[3];
                if(imageSize > 4){
                    image.image5 = postEntity.courseImage[4];
                    if(imageSize > 5) image.image6 = postEntity.courseImage[5];
                }
            }
        }
    }
    */
    // post table
    const post: postDTO = {
        title: postEntity.title,
        userId: postEntity.userId,
        province: postEntity.province,
        region: postEntity.region,
        isParking: postEntity.isParking,
        parkingDesc: postEntity.parkingDesc,
        courseDesc: postEntity.courseDesc
    }
    
    // course table
    let courseSize = postEntity.course.length;
    const course: courseDTO = {
       src: postEntity.course[0].address,
       srcLatitude: postEntity.course[0].latitude,
       srcLongitude: postEntity.course[0].longtitude,
       
       dest: postEntity.course[courseSize-1].address,
       destLatitude: postEntity.course[courseSize-1].latitude,
       destLongitude: postEntity.course[courseSize-1].longtitude
    }
    
    if(courseSize > 2){
        console.log("gg");
        course.wayOne = postEntity.course[1].address,
        course.wayOneLatitude = postEntity.course[1].latitude,
        course.wayOneLongitude = postEntity.course[1].longtitude

        if(courseSize >3){
            course.wayTwo = postEntity.course[2].address,
            course.wayTwoLatitude = postEntity.course[2].latitude,
            course.wayTwoLongitude = postEntity.course[2].longtitude
        }
    }

    const t = await db.sequelize.transaction();
    try{
        let postId: number;
        await db.Post.create(post, {transaction:t})
        .then(data =>{     
            postId = data["id"];
        })

        //Course
        course.postId = postId;
        await db.Course.create(course, {transaction:t});
        console.log(postId);
        /*
        //Image
        image.postId = postId;
        await db.PostHasImage.create(image, {transaction:t});
        */

        //PostHasTheme
        for(let index in postEntity.theme){
            console.log("@@@@",postEntity.theme[index]);
            const theme:themeDTO = {
                postId: postId,
                themeName: postEntity.theme[index]
            };
            console.log(theme);
            await db.PostHasTheme.create(theme, {transaction: t});
        
        }
        
        //PostHasWarning
        for(let index in postEntity.warning){
            if(postEntity.warning[index]){
                const warning: warningDTO = {
                    postId: postId,
                    warningName: warningMap[index]
                }
                await db.PostHasWarning.create(warning, {transaction: t});
            }
        }
 
        await t.commit();

        return {
            status: 200,
            data: {
                success: true,
                msg: "DB upload success"
            }
        }

    }catch(err){
        console.log(err);

        await t.rollback();

        return {
            status: 400,
            data:{
                success: false,
                msg : "DB update fail"
            }
        }
    }
    
}
