import { db } from '../models';
import { QueryTypes } from 'sequelize';
import briefInformationDTO from '../interface/res/briefInformationDTO';
import searchDTO from '../interface/req/searchDTO';
import { makeBriefCollection } from './briefCollectionService';
import previewDTO from '../interface/res/previewDTO';

//인기순 검색 서비스
export async function likeSearchService(searchDTO: searchDTO, userId: string) {
  var searchRet: object[];

  if (searchDTO.region.length != 0 && searchDTO.theme && !searchDTO.warning) {
    //지역 + 테마 파싱하는 쿼리
    const regionThemeQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme AND I.postId = P.id AND I.postId = T.postId)
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

    searchRet = await db.sequelize.query(regionThemeQuery, {
      replacements: { userId: userId, region: searchDTO.region, theme: searchDTO.theme },
      type: QueryTypes.SELECT,
    });
  } else if (searchDTO.region.length != 0 && !searchDTO.theme && searchDTO.warning) {
    //지역 + 주의사항 파싱하는 쿼리
    console.log("ㅎㅎ" )
    console.log("warning", searchDTO.warning)
    const regionWarningQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE P.id NOT IN (
        SELECT P.id
        FROM post_has_warning
        WHERE post_has_warning.warningName = :warning AND post_has_warning.postId = P.id) AND I.postId = P.id AND I.postId = T.postId
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

    searchRet = await db.sequelize.query(regionWarningQuery, {
      replacements: { userId: userId, region: searchDTO.region, warning: searchDTO.warning },
      type: QueryTypes.SELECT,
    });
    console.log("ddd", searchRet)
  } else if (searchDTO.region.length == 0 && searchDTO.theme && searchDTO.warning) {
    //테마 + 주의사항 파싱하는 쿼리
    const themeWarningQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme, post_has_warning
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme AND post_has_warning.warningName = :warning and post_has_warning.postId = P.id
        AND I.postId = P.id AND I.postId = T.postId)
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

    searchRet = await db.sequelize.query(themeWarningQuery, {
      replacements: { userId: userId, theme: searchDTO.theme, warning: searchDTO.warning },
      type: QueryTypes.SELECT,
    });
  } else if (searchDTO.region.length != 0 && !searchDTO.theme && !searchDTO.warning) {
    //지역만 파싱하는 쿼리
    const regionQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE I.postId = P.id AND I.postId = T.postId
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

    searchRet = await db.sequelize.query(regionQuery, {
      replacements: { userId: userId, region: searchDTO.region },
      type: QueryTypes.SELECT,
    });
  } else if (searchDTO.region.length == 0 && searchDTO.theme && !searchDTO.warning) {
    //테마만 파싱하는 쿼리
    const themeQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme
        WHERE post_has_theme.themeName = :theme AND post_has_theme.postId = P.id AND I.postId = P.id AND I.postId = T.postId)
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
    searchRet = await db.sequelize.query(themeQuery, {
      replacements: { userId: userId, theme: searchDTO.theme },
      type: QueryTypes.SELECT,
    });
  } else if (searchDTO.region.length == 0 && !searchDTO.theme && searchDTO.warning) {
    //주의사항만 파싱하는 쿼리
    const warningQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_warning
        WHERE post_has_warning.warningName = :warning AND post_has_warning.postId = P.id AND I.postId = P.id AND I.postId = T.postId)
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;
    searchRet = await db.sequelize.query(warningQuery, {
      replacements: { userId: userId, warning: searchDTO.warning },
      type: QueryTypes.SELECT,
    });
  } else {
    //검색어가 3개일 때 쿼리
    const rtwSearchQuery = `SELECT count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, P.id, P.title, I.image1, T.region, T.theme, T.warning
        FROM (SELECT id, title FROM post WHERE region = :region) AS P
        LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
        LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id and isLike.UserId =:userId)
        INNER JOIN post_has_image as I
        INNER JOIN post_has_tags as T
        WHERE P.id IN (
        SELECT P.id
        FROM post_has_theme, post_has_warning
        WHERE post_has_theme.postId = P.id AND post_has_theme.themeName = :theme AND post_has_warning.warningName = :warning and post_has_warning.postId = P.id AND I.postId = P.id AND I.postId = T.postId)
        GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

    searchRet = await db.sequelize.query(rtwSearchQuery, {
      replacements: {
        userId: userId,
        region: searchDTO.region,
        theme: searchDTO.theme,
        warning: searchDTO.warning,
      },
      type: QueryTypes.SELECT,
    });
  }

  try {
    let brief: briefInformationDTO[] = [];

    const searchInfo: previewDTO = {
      totalCourse: searchRet.length,
      drive: brief,
    };

    await makeBriefCollection(searchRet, brief);
    return {
      status: 200,
      data: {
        success: true,
        msg: '검색뷰 통신에 성공한 혜령, 호택 너무 수고했엉 최고봉봉!!!',
        data: searchInfo,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: 502,
      data: {
        success: false,
        msg: 'DB preview loading error',
      },
    };
  }
}
