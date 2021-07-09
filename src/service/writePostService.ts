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

    /*
    const theme: themeDTO = {
        theme: postEntity.theme[0]
    }

    const themeSize = postEntity.theme.length;
    if(themeSize > 1){
        theme.theme2 = postEntity.theme[1];
        if(themeSize > 2) theme.theme3 = postEntity.theme[2];
    }
    */

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
        
        
        //Image
        image.postId = postId;
        await db.PostHasImage.create(image, {transaction:t});
        

        //PostHasTheme
        postEntity.theme.forEach( async (value, index) => {
            const theme:themeDTO = {
                postId: postId,
                themeName: value
            }
            await db.PostHasTheme.create(theme, {transaction: t});
        })
        
        /*
        theme.postId = postId;
        await db.PostHasTheme.create(theme, {transaction:t});
        */

        //PostHasWarning
        postEntity.warning.forEach( async (value, index) => {
            if(value){
                const warning: warningDTO = {
                    postId: postId,
                    warningName: warningMap[index];
                }
                await db.PostHasTheme.create(warning, {transaction: t});
            }
        });

        /*
        let warningSize = warningText.length;
        const warning: warningDTO = {
            postId: postId
        };
        if(warningSize > 0){
            warning.warning1 = warningText[0];

            if(warningSize > 1){
                warning.warning2 = warningText[1];

                if(warningSize > 2){
                    warning.warning3 = warningText[2];
                    
                    if(warningSize > 3) warning.warning4 = warningText[3];
                }
            }
        }
        await db.PostHasWarning.create(warning, {transaction:t});
        */
        await t.commit();

        console.log("successfully update")
        
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
