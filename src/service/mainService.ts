import { sequelize } from "../Loaders/db";
import { validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { ArrayDataType, QueryTypes} from 'sequelize';
import { mainDTO } from '../interface/res/mainDTO'
import e, { request } from "express";
import post from "../models/Post"
import post_has_theme from "../models/PostHasTheme"

/* TO 지은, 정말 쿼리문 or 시퀄라이즈 이용해서 게시글 모든 정보를 얻어올 수 있을거야 이걸 DTO import 해서 맞춰서 data에 리턴 시키면 될듯! */
var mainLocalData: object
var maincustomThemeData: object
var localTitle: string
var localCity: string
var customThemeTitle: string
var customTheme: string
var warningTheme: string
var localPIArray = []; //PI :postId
var customThemePIArray = [];
var todayPIArray = [];
var trendPIArray = [];

export var mainData: mainDTO = {
  banner: [{
      bannerImage: "",
      bannerTags: "",
      bannerTitle: ""
  }],
  todayCharoDrive: [{
    title: '',
    tags: [],
    image: '',
    isFavorite: true
  }],
  trendDrive: [{
     title: '',
      tags: [],
      image: '',
      isFavorite: true
  }],
  customThemeTitle: '',
  customThemeDrive: [{
      title: '',
      tags: [],
      image: '',
      isFavorite: true
  }],
  localTitle: '',
  localDrive: [{
      title: '',
      tags: [],
      image: '',
      isFavorite: false
  }],
}

export async function localMain(userId: string, city: string){

  const localDataQuery = `SELECT P.id, P.userId, P.title, liked_post.postId as isFavorite
                FROM (SELECT * FROM post WHERE post.city= :city) AS P
                LEFT OUTER JOIN liked_post ON( 
                liked_post.userId = :userId 
                AND P.id = liked_post.postId)`  

  const localDataReturn = await sequelize.query(localDataQuery,{ replacements:{userId:userId, city:city},type: QueryTypes.SELECT });           
  localCity = city
  return localDataReturn
}


export async function customThemeMain(userId: string, theme: string){

  const customThemeDataQuery = `SELECT P.id, P.userId, P.title, liked_post.postId as isFavorite
                FROM (SELECT * FROM post INNER JOIN post_has_theme WHERE post.id = post_has_theme.postId AND post_has_theme.theme1= :theme) AS P
                LEFT OUTER JOIN liked_post ON( 
                liked_post.userId = :userId 
                AND P.id = liked_post.postId)` 

  const customThemeDataReturn = await sequelize.query(customThemeDataQuery, { replacements:{userId:userId, theme:theme},type: QueryTypes.SELECT }); 
  return customThemeDataReturn
}

// 지역 데이터중 title, isFavorite 맵핑하는 함수
function makeMainLocalData(data: object) {
  localPIArray = []
  for (let key in data) {
      let titleValue:string = data[key]['title'];
      let favoriteValue = data[key]['isFavorite'];
      
      if (favoriteValue == null) {
          favoriteValue = false
      } 
      else {
          favoriteValue = true
      }

      mainData.localDrive[key] = {
        "title": titleValue,
        "isFavorite": favoriteValue
    }
      //게시물 태그추출을 위한 postIdArray 
      localPIArray.push(data[key]['id'])
      console.log("localPIArray",localPIArray)
  }
  mainLocalData = mainData.localDrive
}

// 테마 데이터중 title, isFavorite 맵핑하는 함수
async function makeMainCustomThemeData(data: object) {
  customThemePIArray = []
  for (let key in data) {

      let titleValue:string = data[key]['title'];
      let favoriteValue = data[key]['isFavorite'];
      
      if (favoriteValue == null) {
          favoriteValue = false
      } 
      else {
          favoriteValue = true
      }

      mainData.customThemeDrive[key] = {
        "title": titleValue,
        "isFavorite": favoriteValue
    }
      //게시물 태그추출을 위한 postIdArray 
      customThemePIArray.push(data[key]['id'])
  }
  maincustomThemeData = mainData.customThemeDrive
}

// async function trendMain(){

//   const trendDataQuery = `SELECT P.id, P.userId, P.title, liked_post.postId as isFavorite
//   FROM (SELECT * FROM post WHERE liked_post.postId != null) AS P
//   LEFT OUTER JOIN liked_post ON( 
//   liked_post.userId = :userId 
//   AND P.id = liked_post.postId)`  

//   const trendDataReturn = await sequelize.query(trendDataQuery,{ type: QueryTypes.SELECT });           
//   console.log("아아아아ㅏㅇ 라이크 라이크 나오냐", trendDataReturn)
// }





// 태그 데이터 맵핑 함수
async function getTagData(postId:object, postObj: object) {
  console.log("Theme", postObj)
  for (let id in postId) {

  const query = `SELECT post_has_warning.warning1, post_has_warning.warning2, post_has_warning.warning3, post_has_warning.warning4  
  FROM post_has_warning
  WHERE post_has_warning.postId = :postId`  

  const ret = await sequelize.query(query,{ replacements:{postId:postId[id]}, type: QueryTypes.SELECT });     
  console.log("warning", ret);
  warningPrioritySort(ret)
  
  var selectTheme = await post_has_theme.findOne({ 
    where: {
    postId : postId[id],
    },
  attributes : ['theme1'],
  });

  var selectPost = await post.findOne({ 
    where: {
    id : postId[id],
    },
  attributes : ['city'], 
  });

  console.log("city",selectPost.city)
  Object.assign(postObj[id],{ 'tags' : [selectPost.city, selectTheme.theme1, warningTheme]})
  }
}

// 이미지 받아오는 함수
async function getImageData(postId: object, postObj: object) {
console.log("obj", postObj)
  for (let id in postId) {

    const postImageQuery = `SELECT post_has_image.image1
    FROM post_has_image
    WHERE post_has_image.id = :postId`
    const ret = await sequelize.query(postImageQuery,{ replacements:{postId:postId[id]}, type: QueryTypes.SELECT });   
    console.log("이미지오냐?", ret);
  
    Object.assign(postObj[id],{ 'image' : ret[0]['image1']})
    }
  
}

// 주의사항 우선순위 정렬 함수
function warningPrioritySort(warning: object) {
  console.log("오긴오냐??", warning)
  var priority: number;
  var warningObj = []
  
  function isEmptyObj(obj)  {
    if(obj === "" || obj === null || obj === undefined || (obj !== null && typeof obj === "object" && !Object.keys(obj).length))
    {
      return true;
    }
    else {
      return false;
    }
  }

  if ( isEmptyObj(warning) ) {
    console.log("hihics")
    warningTheme = '';
  }
  else {
    if (warning[0]['warning1'] != null) {
    priority = 3
    warningObj.push([warning[0]['warning1'], priority])
    console.log('warningObj', warningObj)
    }
    if (warning[0]['warning2'] != null) {
      priority = 4
      warningObj.push([warning[0]['warning2'], priority])
      console.log('warningObj', warningObj)
    }
    if (warning[0]['warning3'] != null) {
      priority = 1
      warningObj.push([warning[0]['warning3'] ,priority])
      console.log('warningObj', warningObj)
    }
    if (warning[0]['warning4'] != null) {
      priority = 2
      warningObj.push([4,priority])
      console.log(warning[0]['warning4'], warningObj)
    }
    console.log("ass", warningObj)
    warningObj = warningObj.sort((a,b) => a[1] - b[1])

    console.log("sort", warningObj)
    console.log("최종값", warningObj[0][0])
    warningTheme = warningObj[0][0];
  }
}

// 메인데이터 export함수 (최종 파싱)
export default async function getMain(id: string){

  const customThemeStandardQuery = `SELECT * FROM custom WHERE custom.customTheme = '여름'` 
  const customThemeStandardRet = await sequelize.query(customThemeStandardQuery, { type: QueryTypes.SELECT }); 

  const localStandardQuery = `SELECT * FROM local WHERE local.localCity = '부산'` 
  const localStandardRet = await sequelize.query(localStandardQuery, { type: QueryTypes.SELECT }); 
  
  customTheme = await customThemeStandardRet[0]['customTheme']
  customThemeTitle = await customThemeStandardRet[0]['customTitle']

  localCity = await localStandardRet[0]['localCity']
  localTitle = await localStandardRet[0]['localTitle']

  
  mainData.customThemeTitle = customThemeTitle
  mainData.localTitle = localTitle

  await customThemeMain(id, customTheme).then( res => {
    makeMainCustomThemeData(res);
  })

  // P 가 post 객체나 마찬가지 -> 얘를 SELECT 옆에서 파싱하면 된다. / isFavorite이 null일 때만 하트X 
  await localMain(id, localCity).then( res => {
    makeMainLocalData(res);
  })

  
  for (let i = 0; i < 4; i++) {
    let identifierArray = []
    var identifier = {}

    if (i == 0) {
      console.log("0")
      identifierArray = todayPIArray
     // identifier = 
    }
    else if (i == 1) {
      console.log("1")
      identifierArray = trendPIArray
    }
    else if (i == 2) {
      console.log("2")
      identifierArray = customThemePIArray
      identifier = maincustomThemeData 
    }
    else {
      console.log("3")
      identifierArray = localPIArray
      identifier = mainLocalData
    }
    console.log("identifierArray", identifierArray)
    await getTagData(identifierArray, identifier);
    await getImageData(identifierArray, identifier);
  }

    
  return {
      data: mainData
  }
}