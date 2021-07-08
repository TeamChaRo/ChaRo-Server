import { sequelize } from "../Loaders/db";
import { validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { ArrayDataType, QueryTypes} from 'sequelize';
import { mainDTO } from '../interface/res/mainDTO'
import { request } from "express";
import Theme from "../models/Theme";

/* TO 지은, 정말 쿼리문 or 시퀄라이즈 이용해서 게시글 모든 정보를 얻어올 수 있을거야 이걸 DTO import 해서 맞춰서 data에 리턴 시키면 될듯! */
var mainLocalData: object
var localTitle: string
var localCity: string
var themeName: string

var tagIdArray = [];
export var mainData: mainDTO = {
  banner: {
      bannerImage: "",
      bannerTags: "",
      bannerTitle: ""
  },
  seasonTitle: '',
  season: [{
      title: '',
      tags: [],
      image: '',
      isFavorite: true
  }],
  localTitle: '',
  local: [{
      title: '',
      tags: [],
      image: '',
      isFavorite: false
  }],
}

export async function localMain(userId: string, city: string){

  const t = await
  sequelize.transaction();

  // P 가 post 객체나 마찬가지 -> 얘를 SELECT 옆에서 파싱하면 된다. / isFavorite이 null일 때만 하트X 
  const localDataQuery = `SELECT P.id, P.userId, P.title, liked_post.postId as isFavorite
               FROM (SELECT * FROM post WHERE post.city= :city) AS P
               LEFT OUTER JOIN liked_post ON( 
               liked_post.userId = :userId 
               AND P.id = liked_post.postId)`  
 
  const localDataReturn = await sequelize.query(localDataQuery,{ transaction: t , replacements:{userId:userId, city:city},type: QueryTypes.SELECT });           
  localCity = city
  return localDataReturn
}

export async function themeMain(userId: string, theme: number){

  // P 가 post 객체나 마찬가지 -> 얘를 SELECT 옆에서 파싱하면 된다. / isFavorite이 null일 때만 하트X 
  const query = `SELECT P.id, P.userId, liked_post.postId as isFavorite
                FROM (SELECT * FROM post INNER JOIN post_has_theme WHERE post.id = post_has_theme.postId AND post_has_theme.theme1= :theme) AS P
                LEFT OUTER JOIN liked_post ON( 
                liked_post.userId = :userId 
                AND P.id = liked_post.postId)` 

  const ret = await sequelize.query(query, { replacements:{userId:userId, theme:theme},type: QueryTypes.SELECT }); 
  console.log("테마",ret);
}

export async function themeStandard(){
  
  const t = await 
  sequelize.transaction();

  const query = `SELECT * FROM custom WHERE custom.customTheme = '6'` 

  const ret = await sequelize.query(query, { transaction: t, type: QueryTypes.SELECT }); 

  var standardTheme:number = await parseInt(ret[0]['customTheme'])
  var standardTitle:string = await ret[0]['customTitle']

  return { standardTheme, standardTitle }
}


function makeMainLocalData(data: object) {
  for (let key in data) {
      let titleValue:string = data[key]['title'];
      let favoriteValue = data[key]['isFavorite'];
      
      if (favoriteValue == null) {
          favoriteValue = false
      } 
      else {
          favoriteValue = true
      }

      mainLocalData = mainData.local[key] = {
          "title": titleValue,
          "image": "",
          "isFavorite": favoriteValue
      }

      tagIdArray.push({id : data[key]['id']})
      console.log("tagArray", tagIdArray)
  }
}

async function getThemeData(postId:object) {

  console.log("djdjdj", postId)

  var themeArray = []

  for (let id in postId) {
    console.log("idid",postId[id].id)

    const query = `SELECT post_has_theme.theme1
  FROM post_has_theme
  WHERE post_has_theme.postId = :postId`  

  const ret = await sequelize.query(query,{ replacements:{postId:postId[id].id}, type: QueryTypes.SELECT });           
  console.log("ret",ret)
  convertThemeToString(ret[id].id)

  console.log('mainLocalData', mainLocalData)

  Object.assign(mainLocalData,{ 'tags' : [localCity,themeName, '']})
  console.log("mainLocalData",mainLocalData)
  mainData.local[id] = mainLocalData
  themeArray.push(ret)
  }
}

//태그 추출을 위한 string convert 함수
function convertThemeToString(themeId: number) {
  //var themeName: string
  if (themeId == 1) {
    themeName = '산'
  }
  else if (themeId == 2) {
    themeName = '바다'
  }
  else if (themeId == 3) {
    themeName = '호수'
  }
  else if (themeId == 4) {
    themeName = '강'
  }
  else if (themeId == 5) {
    themeName = '봄'
  }
  else if (themeId == 6) {
    themeName = '여름'
  }
  else if (themeId == 7) {
    themeName = '가을'
  }
  else if (themeId == 8) {
    themeName = '겨울'
  }
  else if (themeId == 9) {
    themeName = '해안도로'
  }
  else if (themeId == 10) {
    themeName = '벚꽃'
  }
  else if (themeId == 11) {
    themeName = '단풍'
  }
  else if (themeId == 12) {
    themeName = '여유'
  }
  else if (themeId == 13) {
    themeName = '스피드'
  }
  else if (themeId == 14) {
    themeName = '야경'
  }
  else {
    themeName = '도심'
  }
  return themeName
}

export default async function getMain(id: string){

  const t = await
  sequelize.transaction();

  const localStandardQuery = `SELECT * FROM local WHERE local.localCity = '부산'` 
  const localStandardRet = await sequelize.query(localStandardQuery, { transaction: t, type: QueryTypes.SELECT }); 
  
  localCity = await localStandardRet[0]['localCity']
  localTitle = await localStandardRet[0]['localTitle']
  mainData.localTitle = localTitle


  // P 가 post 객체나 마찬가지 -> 얘를 SELECT 옆에서 파싱하면 된다. / isFavorite이 null일 때만 하트X 
  await localMain(id, localCity).then( res => {
    makeMainLocalData(res);
  })
  
    console.log("tagArray111", tagIdArray)
    await getThemeData(tagIdArray);
  
    
  return {
      data: mainData
  }
}