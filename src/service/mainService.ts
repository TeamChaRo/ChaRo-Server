import { sequelize } from "../Loaders/db";
import { validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { ArrayDataType, QueryTypes} from 'sequelize';
import { mainDTO } from '../interface/res/mainDTO'
import { request } from "express";

/* TO 지은, 정말 쿼리문 or 시퀄라이즈 이용해서 게시글 모든 정보를 얻어올 수 있을거야 이걸 DTO import 해서 맞춰서 data에 리턴 시키면 될듯! */
var mainLocalData: object
var localTitle: string
var localCity: string
var themeName: string
var tagIdArray = [];

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
  seasonTitle: '',
  seasonDrive: [{
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
    console.log("key",key)
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
        "image": "",
        "isFavorite": favoriteValue
    }
      //게시물 태그추출을 위한 postIdArray 
      tagIdArray.push(data[key]['id'])
  }
  mainLocalData = mainData.localDrive
}

async function getThemeData(postId:object) {

  for (let id in postId) {

  const query = `SELECT post_has_theme.theme1
  FROM post_has_theme
  WHERE post_has_theme.postId = :postId`  

  const ret = await sequelize.query(query,{ replacements:{postId:postId[id]}, type: QueryTypes.SELECT });           

  Object.assign(mainLocalData[id],{ 'tags' : [localCity,ret[0]['theme1'], '']})
  }
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
  
  await getThemeData(tagIdArray);
    
  return {
      data: mainData
  }
}