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

export default async function modifyPostService(postId: number, postEntity: writePostDTO ){
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

    const tags: tagDTO = {
        postId: postId,
        region: postEntity.region,
        theme: postEntity.theme[0]
    };
    
    try{

        db.Post.update(post, {where : {id:postId}});
        db.Course.update(course, {where : {postId:postId}});

        //db.PostHasImage.update(image, {where : {id:postId}});

        //PostHasTheme
        postEntity.theme.map( (value, index) => {
            const theme:themeDTO = {
                postId: postId,
                themeName: value
            };
            db.PostHasTheme.update(theme, {where : {postId:postId}});
        });

        let tagInsertFlag = true;
        postEntity.warning.map( (value, index) => {
            if(value){
                if(index == 0){
                    tags.warning = warningMap[index];
                    db.PostHasTags.update(tags, {where : {postId:postId}});
                    tagInsertFlag = false;
                } 
                const warning: warningDTO = {
                    postId: postId,
                    warningName: warningMap[index]
                }
                db.PostHasWarning.update(warning, {where : {postId:postId}});
            }
        });

        if( !tagInsertFlag ) db.PostHasTags.update(tags, {where : {postId:postId}});
        return {
            status: 200,
            data: {
                success: true,
                msg: "옛날옛날에 아기돼지 6 형제가 살았습니다 내일은.. 내일은 서버왕" // "modify - DB upload success";
            }
        }
        
    }catch(err){
        return {
            status: 400,
            data:{
                success: false,
                msg : "modify - DB update fail"
            }
        }
    }
}