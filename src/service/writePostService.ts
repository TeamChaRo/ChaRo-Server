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
        course.wayOne = postEntity.course[1].address,
        course.wayOneLatitude = postEntity.course[1].latitude,
        course.wayOneLongitude = postEntity.course[1].longtitude

        if(courseSize >3){
            course.wayTwo = postEntity.course[2].address,
            course.wayTwoLatitude = postEntity.course[2].latitude,
            course.wayTwoLongitude = postEntity.course[2].longtitude
        }
    }

    try{
    //     let postId: number;
    //     await db.Post.create(post).then(data => postId = data["id"]);

    //     const tags: tagDTO = {
    //         postId: postId,
    //         region: postEntity.region,
    //         theme: postEntity.theme[0],
    //     };

    //     //Course
    //     course.postId = postId;
    //     db.Course.create(course);

    //     //Image
    //     //image.postId = postId;
    //     //db.PostHasImage.create(image)

    //     //PostHasTheme
    //     postEntity.theme.map( (value, index) => {
    //         const theme:themeDTO = {
    //             postId: postId,
    //             themeName: value
    //         };
    //         db.PostHasTheme.create(theme);
    //     });

    //     let tagInsertFlag = true;
    //     postEntity.warning.map( (value, index) => {
    //         if(value){
    //             if(index == 0){
    //                 tags.warning = warningMap[index];
    //                 db.PostHasTags.create(tags);
    //                 tagInsertFlag = false;
    //             } 
    //             const warning: warningDTO = {
    //                 postId: postId,
    //                 warningName: warningMap[index]
    //             }
    //             db.PostHasWarning.create(warning);
    //         }
    //     });

    //    if( !tagInsertFlag ) db.PostHasTags.create(tags);
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
