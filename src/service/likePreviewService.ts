import { db } from '../models';
import { QueryTypes } from 'sequelize';
import briefInformationDTO from '../interface/res/briefInformationDTO';
import previewDTO from '../interface/res/previewDTO';

import previewMap from './previewMap.json';

import { makeBriefCollection } from './briefCollectionService';

export async function likeTrendService(userId: string) {
  const query = `SELECT P.id, P.title,  count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, 
                    T.region, I.image1, T.region, T.theme, T.warning
                    FROM (SELECT id, title FROM post) AS P
                    LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                    LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                    INNER JOIN post_has_image as I
                    INNER JOIN post_has_tags as T
                    WHERE I.postId = P.id and I.postId = T.postId
                    GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

  const result = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { userId: userId },
    raw: true,
    nest: true,
  });

  let brief: briefInformationDTO[] = [];

  const preview: previewDTO = {
    totalCourse: result.length,
    drive: brief,
  };

  try {
    await makeBriefCollection(result, brief);
    return {
      status: 200,
      data: {
        success: true,
        msg:
          '사람을 화나게 하는 방법은 크게 두가지가 있습니다.첫째는 말을 하다가 마는 것이고 둘째는 ... 더보기', //"successfully load preview based on Today's Charo",
        data: preview,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export async function likeLocalService(local: string, userId: string) {
  const regionName = previewMap.region[local];

  const localQuery = `SELECT P.id, P.title,  count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, 
                            T.region, I.image1, T.region, T.theme, T.warning
                            FROM (SELECT id, title FROM post WHERE region=:region) AS P
                            LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                            LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                            INNER JOIN post_has_image as I
                            INNER JOIN post_has_tags as T
                            WHERE I.postId = P.id and I.postId = T.postId
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;

  const result = await db.sequelize.query(localQuery, {
    type: QueryTypes.SELECT,
    replacements: { userId: userId, region: regionName },
    raw: true,
    nest: true,
  });

  let brief: briefInformationDTO[] = [];

  const preview: previewDTO = {
    totalCourse: result.length,
    drive: brief,
  };

  try {
    await makeBriefCollection(result, brief);
    return {
      status: 200,
      data: {
        success: true,
        msg:
          '96시간 4일 안에 보내시오.그의 비서에게 20통을 만들라고 지시했다. 카를로스는 같은 메세지를 받았으나 ', //"successfully load preview based on local city",
        data: preview,
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

export async function likeThemeService(theme: string, userId: string) {
  const themeName = previewMap.theme[theme];

  const themeQuery = `SELECT P.id, P.title, count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite,
                            I.image1, T.region, T.theme, T.warning
                            FROM post as P
                            INNER JOIN post_has_image AS I
                            INNER JOIN post_has_tags AS T
                            LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                            LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                            WHERE P.id in (SELECT postId FROM post_has_theme WHERE themeName=:theme)
                            AND P.id = I.postId AND I.postId = T.postId
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 20`;

  const result = await db.sequelize.query(themeQuery, {
    replacements: { userId: userId, theme: themeName },
    type: QueryTypes.SELECT,
    raw: true,
    nest: true,
  });

  let brief: briefInformationDTO[] = [];

  const preview: previewDTO = {
    totalCourse: result.length,
    drive: brief,
  };
  try {
    await makeBriefCollection(result, brief);
    return {
      status: 200,
      data: {
        success: true,
        msg: '1967년 브루노는 이 메세지를 받았으나단지 웃어버린 후 버렸다. 몇일 후 그의 아들이', //"successfully load preview based on theme",
        data: preview,
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
