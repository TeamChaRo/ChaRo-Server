import { sequelize } from "../Loaders/db";
import { validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { ArrayDataType, QueryTypes} from 'sequelize';
import { mainDTO } from '../interface/res/mainDTO'
import e, { request } from "express";
import post from "../models/Post"
import post_has_theme from "../models/PostHasTheme"
import { count } from "console";

/* TO 지은, 정말 쿼리문 or 시퀄라이즈 이용해서 게시글 모든 정보를 얻어올 수 있을거야 이걸 DTO import 해서 맞춰서 data에 리턴 시키면 될듯! */
var mainLocalData: object
var maincustomThemeData: object
var mainTrendDriveData: object
var mainCharoDriveData: object
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

// 배너 데이터 가져오는 함수
async function getBannerData() {

  const bannerDataQuery = `SELECT B.bannerTitle, B.bannerImage, B.bannerTag
                FROM banner AS B` 

  const bannerDataReturn = await sequelize.query(bannerDataQuery, { type: QueryTypes.SELECT }); 

  for (let key in bannerDataReturn) {
    let titleValue:string = bannerDataReturn[key]['bannerTitle'];
    let imageValue = bannerDataReturn[key]['bannerImage'];
    let bannerValue = bannerDataReturn[key]['bannerTag'];

    mainData.banner[key] = {
      "bannerTitle": titleValue,
      "bannerImage": imageValue,
      "bannerTags": bannerValue
    }
  }

}


// 차로의 오늘 추천 드라이브 -> 일단 사용자가 저장한 게시물로만 가져왔음! 추후에 수정예정
async function todayCharoMain(userId: string){

  const todayCharoDataQuery = `SELECT PostId FROM saved_post WHERE saved_post.userId = :userId`  
  const todayCharoDataReturn = await sequelize.query(todayCharoDataQuery,{ replacements:{userId:userId}, type: QueryTypes.SELECT });           
  todayPIArray = []

  for (let i in todayCharoDataReturn) {
    const todayCharoPostQuery = `SELECT P.id, P.userId, P.title, liked_post.postId as isFavorite
                FROM (SELECT * FROM post WHERE post.id = :postId) AS P
                LEFT OUTER JOIN liked_post ON( 
                liked_post.userId = :userId 
                AND P.id = liked_post.postId)`

    const todayCharoPostReturn = await sequelize.query(todayCharoPostQuery,{ replacements:{userId:userId, postId: todayCharoDataReturn[i]['PostId']},type: QueryTypes.SELECT });

    let titleValue:string = todayCharoPostReturn[0]['title'];
    let favoriteValue:boolean = todayCharoPostReturn[0]['isFavorite'];

    if (favoriteValue == null) {
        favoriteValue = false
    } 
    else {
        favoriteValue = true
    }

    mainData.todayCharoDrive[i] = {
      "title": titleValue,
      "isFavorite": favoriteValue,
    } 

    //게시물 태그추출을 위한 postIdArray 
    todayPIArray.push(todayCharoPostReturn[0]['id'])
  }
  
  mainCharoDriveData = mainData.todayCharoDrive
}


// 요즘뜨는 드라이브 데이터 추출함수
async function trendMain(){

  const trendQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id, P.userId, P.title, liked_post.postId as isFavorite 
  FROM (SELECT * FROM post) AS P
  LEFT OUTER JOIN liked_post ON(
  P.id = liked_post.postId) GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`

  const trendDataReturn = await sequelize.query(trendQuery,{ type: QueryTypes.SELECT });  
  return trendDataReturn 
}

// 요즘뜨는 데이터중 title, isFavorite 맵핑하는 함수
function makeMainTrendData(data: object) {
  trendPIArray = []
  for (let key in data) {
      let titleValue:string = data[key]['title'];
      let favoriteValue = data[key]['isFavorite'];
      
      if (favoriteValue == null) {
          favoriteValue = false
      } 
      else {
          favoriteValue = true
      }

      mainData.trendDrive[key] = {
        "title": titleValue,
        "isFavorite": favoriteValue
    }
      //게시물 태그추출을 위한 postIdArray 
      trendPIArray.push(data[key]['id'])
  }
  mainTrendDriveData = mainData.trendDrive
}

// 테마(ex:여름) 기반 데이터 추출함수
export async function customThemeMain(theme: string){
  const customThemeDataQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id, P.userId, P.title, liked_post.postId as isFavorite
                      FROM (SELECT * FROM post INNER JOIN post_has_theme WHERE post.id = post_has_theme.postId AND post_has_theme.theme1= :theme) AS P
                      LEFT OUTER JOIN liked_post ON( 
                      P.id = liked_post.postId) GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4` 

  const customThemeDataReturn = await sequelize.query(customThemeDataQuery, { replacements:{ theme:theme },type: QueryTypes.SELECT }); 
  return customThemeDataReturn
}

// 테마 데이터중 title, isFavorite 맵핑하는 함수
async function makeMainCustomThemeData(data: object) {
  console.log("테마테마", data)
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


// 지역기반 데이터 추출함수
export async function localMain(city: string){

  const localDataQuery = `SELECT count(liked_post.PostId) as favoriteCount, P.id, P.userId, P.title, liked_post.postId as isFavorite
                FROM (SELECT * FROM post WHERE post.city= :city) AS P
                LEFT OUTER JOIN liked_post ON(
                P.id = liked_post.postId) GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`  

  const localDataReturn = await sequelize.query(localDataQuery,{ replacements:{city:city},type: QueryTypes.SELECT });           
  return localDataReturn
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
  }
  mainLocalData = mainData.localDrive
}


// 태그 데이터 맵핑 함수
async function getTagData(postId:object, postObj: object) {
  for (let id in postId) {

  const query = `SELECT post_has_warning.warning1, post_has_warning.warning2, post_has_warning.warning3, post_has_warning.warning4  
  FROM post_has_warning
  WHERE post_has_warning.postId = :postId`  

  const ret = await sequelize.query(query,{ replacements:{postId:postId[id]}, type: QueryTypes.SELECT });     
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

  Object.assign(postObj[id],{ 'tags' : [selectPost.city, selectTheme.theme1, warningTheme]})
  }
}

// 이미지 받아오는 함수
async function getImageData(postId: object, postObj: object) {
  for (let id in postId) {

    const postImageQuery = `SELECT post_has_image.image1
    FROM post_has_image
    WHERE post_has_image.id = :postId`
    const ret = await sequelize.query(postImageQuery,{ replacements:{postId:postId[id]}, type: QueryTypes.SELECT });   
  
    Object.assign(postObj[id],{ 'image' : ret[0]['image1']})
    }
  
}

// 주의사항 우선순위 정렬 함수
function warningPrioritySort(warning: object) {
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
    warningTheme = '';
  }
  else {
    if (warning[0]['warning1'] != null) {
    priority = 3
    warningObj.push([warning[0]['warning1'], priority])
    }
    if (warning[0]['warning2'] != null) {
      priority = 4
      warningObj.push([warning[0]['warning2'], priority])
    }
    if (warning[0]['warning3'] != null) {
      priority = 1
      warningObj.push([warning[0]['warning3'] ,priority])
    }
    if (warning[0]['warning4'] != null) {
      priority = 2
      warningObj.push([4,priority])
    }
    warningObj = warningObj.sort((a,b) => a[1] - b[1])
    warningTheme = warningObj[0][0];
  }
}

// 메인데이터 export함수 (최종 파싱)
export default async function getMain(id: string){

  getBannerData()

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

  await todayCharoMain(id);

  await trendMain().then(res => {
    makeMainTrendData(res);
  })

  await customThemeMain(customTheme).then( res => {
    makeMainCustomThemeData(res);
  })

  await localMain(localCity).then( res => {
    makeMainLocalData(res);
  })

  for (let i = 0; i < 4; i++) {
    let identifierArray = []
    var identifier = {}

    if (i == 0) {
      identifierArray = todayPIArray
      identifier = mainCharoDriveData
    }
    else if (i == 1) {
      identifierArray = trendPIArray
      identifier = mainTrendDriveData
    }
    else if (i == 2) {
      identifierArray = customThemePIArray
      identifier = maincustomThemeData 
    }
    else {
      identifierArray = localPIArray
      identifier = mainLocalData
    }
    await getTagData(identifierArray, identifier);
    await getImageData(identifierArray, identifier);
  }

  return {
      data: mainData
  }
}