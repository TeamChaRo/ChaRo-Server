import { db } from "../models";
import { QueryTypes } from 'sequelize';
import { detailInformationDTO } from '../interface/res/detailDTO';
import { DatePipe } from '@angular/common';
import { integer } from "aws-sdk/clients/cloudfront";

export default async function postDetailService(userId: string, postId: string){

    const warningMap = {
        0: "고속도로",
        1: "산길포함",
        2: "초보힘듦",
        3: "사람많음"
    }

    const query = `select P.id, P.title, P.province, P.region, P.isParking, P.parkingDesc, P.courseDesc, P.createdAt, course.src, course.srcLongitude, course.srcLatitude, course.wayOne, course.wayOneLongitude, course.wayOneLatitude, course.wayTwo, course.wayTwoLongitude, course.wayTwoLatitude, course.dest, course.destLongitude, course.destLatitude, count(liked_post.PostId) as likesCount, user.nickname, user.profileImage, post_has_image.image1, post_has_image.image2, post_has_image.image3, post_has_image.image4, post_has_image.image5, post_has_image.image6
    from post as P
    left outer join liked_post on (P.id = liked_post.PostId)
    left outer join course on (P.id = course.postId)
    left outer join post_has_image on (P.id = post_has_image.postId)
    left outer join user on (P.userId = user.id)
    where P.id = :postId
    group by P.id`;
    
    const result = await db.sequelize.query(query,{ replacements:{ postId: postId },type: QueryTypes.SELECT });
    const postDetailData: detailInformationDTO[] = [];

    try{
            const tempDetailData: detailInformationDTO = {
                title: '',
                author: '',
                profileImage: '',
                postingYear: '',
                postingMonth: '',
                postingDay: '',
                isStored: false,
                isFavorite: false,
                likesCount: 0,
                images: [],
                province: '',
                city: '',
                themes: [],
                source: '',
                wayPoint: [],
                destination: '',
                longtitude: [],
                latitude: [],
                isParking: true,
                parkingDesc: '',
                warnings: [false, false, false, false],
                courseDesc: '',
            };

            tempDetailData.title = result[0]["title"];
            tempDetailData.author = result[0]["nickname"];
            tempDetailData.profileImage = result[0]["profileImage"];
            tempDetailData.likesCount = result[0]["likesCount"];
            tempDetailData.province = result[0]["province"];
            tempDetailData.city = result[0]["region"];
            tempDetailData.source = result[0]["src"];
            tempDetailData.destination = result[0]["dest"];
            tempDetailData.courseDesc = result[0]["courseDesc"];

            if (result[0]["wayOne"] == null) {
                result[0]["wayOne"] = ""
            } 
            if (result[0]["wayTwo"] == null) {
                result[0]["wayTwo"] = ""
            }
            if (result[0]["wayOneLongitude"] == null) {
                result[0]["wayOneLongitude"] = ""
                result[0]["wayOneLatitude"] = ""
            } 
            if (result[0]["wayTwoLongitude"] == null) {
                result[0]["wayTwoLongitude"] = ""
                result[0]["wayTwoLatitude"] = ""
            }

            if (result[0]["isParking"] == null) {
                result[0]["isParking"] = false
                result[0]["parkingDesc"] = ""
            } else {
                result[0]["isParking"] = true
            }

            for (let idx = 1; idx < 7; idx++) {
                if (result[0]["image"+(idx).toString()] != null) {
                    tempDetailData.images.push(result[0]["image"+(idx).toString()])
                }
            }

            const datePipe = new DatePipe('en-US'); 
            const postingYear = datePipe.transform(result[0]["createdAt"], 'yyyy');
            const postingMonth = datePipe.transform(result[0]["createdAt"], 'MM');
            const postingDay = datePipe.transform(result[0]["createdAt"], 'dd');

            tempDetailData.postingYear = postingYear
            tempDetailData.postingMonth = postingMonth
            tempDetailData.postingDay = postingDay
            tempDetailData.isParking = result[0]["isParking"];
            tempDetailData.parkingDesc = result[0]["parkingDesc"];
            tempDetailData.wayPoint = [result[0]["wayOne"], result[0]["wayTwo"]];
            tempDetailData.longtitude = [result[0]["srcLongitude"], result[0]["wayOneLongitude"], result[0]["wayTwoLongitude"], result[0]["destLongitude"]];
            tempDetailData.latitude = [result[0]["srcLatitude"], result[0]["wayOneLatitude"], result[0]["wayTwoLatitude"], result[0]["destLatitude"]];
            

            //테마 추출
            const themePromise = new Promise( async (resolve, reject) => {
                const themeQuery = `select post_has_theme.themeName
                from post_has_theme
                where post_has_theme.postId = :postId
                ORDER BY post_has_theme.createdAt ASC`;

                const themeRet = await db.sequelize.query(themeQuery,{ replacements:{postId:postId},type: QueryTypes.SELECT });
                tempDetailData.themes = [themeRet[0]["themeName"], themeRet[1]["themeName"], themeRet[2]["themeName"]]

                resolve("success");
            });

            //주의사항 추출
            const warningPromise = new Promise( async (resolve, reject) => {
                const warningQuery = `select post_has_warning.warningName
                from post_has_warning
                where post_has_warning.postId = :postId`;
                const warningRet = await db.sequelize.query(warningQuery,{ replacements:{postId:postId},type: QueryTypes.SELECT });

                for (let idx in warningRet) {
                    for (let j = 0; j < 4; j++) {
                        if (warningRet[idx]["warningName"] == warningMap[j]) {
                            tempDetailData.warnings[j] = true
                        }
                    }
                }
                resolve("success");
            });

            //좋아요 여부 추출
            const isFavoritePromise = new Promise( async (resolve, reject) => {
                const isFavoriteQuery = `select * from liked_post where PostId = :postId and UserId = :userId`;
                const isFavoriteRet = await db.sequelize.query(isFavoriteQuery,{ replacements:{userId: userId, postId:postId},type: QueryTypes.SELECT });
                if(isFavoriteRet.length > 0) tempDetailData.isFavorite = true
                resolve("success");
            });

            //저장 여부 추출
            const isStoredPromise = new Promise( async (resolve, reject) => {
                const isStoredQuery = `select * from saved_post where PostId = :postId and UserId = :userId`;
                const isStoredRet = await db.sequelize.query(isStoredQuery,{ replacements:{userId: userId, postId:postId},type: QueryTypes.SELECT });
                if(isStoredRet.length > 0) tempDetailData.isStored = true
                resolve("success");
            });

            await Promise.all([themePromise, warningPromise, isFavoritePromise, isStoredPromise]) 
                .then(() => { postDetailData.push(tempDetailData) })
                .catch(err => { throw err; })

        return {
            status: 200,
            data:{
                success: true,
                msg : "게시물 상세조회 성공 ꉂꉂ(ᵔᗜᵔ*)",
                data : postDetailData
            }
        }

    } catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                msg : "DB preview loading error"
            }
        }
    }
}