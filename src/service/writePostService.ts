import { db } from "../models";
import writePostDTO from "../interface/req/writePostDTO";
import postDTO from "../interface/req/postDTO";
import courseDTO from "../interface/req/courseDTO";
import warningDTO from "../interface/req/warningDTO";
import themeDTO from "../interface/req/themeDTO";
import imageDTO from "../interface/req/imageDTO";
import tagDTO from "../interface/req/tagDTO";

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
    const courseSize = postEntity.course.address.length;
    const course: courseDTO = {
        src: postEntity.course.address[0],
        srcLatitude: postEntity.course.latitude[0],
        srcLongitude: postEntity.course.longtitude[0],

        dest: postEntity.course.address[courseSize-1],
        destLatitude: postEntity.course.latitude[courseSize-1],
        destLongitude: postEntity.course.longtitude[courseSize-1]
    }
    if(courseSize > 2){
        course.wayOne = postEntity.course.address[1];
        course.wayOneLatitude = postEntity.course.latitude[1];
        course.wayOneLongitude = postEntity.course.longtitude[1];

        if(courseSize >3){
            course.wayTwo = postEntity.course.address[2];
            course.wayTwoLatitude = postEntity.course.latitude[2];
            course.wayTwoLongitude = postEntity.course.longtitude[2];
        }
    }

    try{
        let postId: number;
        await db.Post.create(post).then(data => postId = data["id"]);

        const tags: tagDTO = {
            postId: postId,
            region: postEntity.region,
            theme: postEntity.theme[0],
        };

        //Course
        course.postId = postId;
        await db.Course.create(course);

        //Image
        image.postId = postId;
        await db.PostHasImage.create(image)

        //PostHasTheme
        postEntity.theme.map( async (value, index) => {
            const theme:themeDTO = {
                postId: postId,
                themeName: value
            };
            await db.PostHasTheme.create(theme);
        });

        postEntity.warning.map( async (value, index) => {
            if(index == 0){
                if(value){
                    tags.warning = warningMap[index];
                    await db.PostHasTags.create(tags);
                }else{
                    await db.PostHasTags.create(tags);
                }
            }
            if(value){
                const warning: warningDTO = {
                    postId: postId,
                    warningName: warningMap[index]
                }
                await db.PostHasWarning.create(warning);
            }
        });

        return {
            status: 200,
            data: {
                success: true,
                msg: "DB upload success"
            }
        }

    }catch(err){
        console.log(err);
        return {
            status: 400,
            data:{
                success: false,
                msg : "DB update fail"
            }
        }
    }
    
}
