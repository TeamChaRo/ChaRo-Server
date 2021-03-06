import { db } from '../models';
import { QueryTypes } from 'sequelize';

import mainDTO from '../interface/res/mainDTO';
import bannerDTO from '../interface/res/bannerDTO';
import briefInformationDTO from '../interface/res/briefInformationDTO';

import { makeBriefCollection } from './briefCollectionService';

export default async function mainService(userId: string, theme: string, region: string) {
  try {
    let banner: bannerDTO[] = [];
    let today: briefInformationDTO[] = [];
    let trend: briefInformationDTO[] = [];
    let custom: briefInformationDTO[] = [];
    let local: briefInformationDTO[] = [];

    const main: mainDTO = {
      banner: banner,
      todayCharoDrive: today,
      trendDrive: trend,
      customThemeTitle: '',
      customThemeDrive: custom,
      localTitle: '',
      localDrive: local,
    };

    //SELECT C.customThemeTitle, L.localTitle FROM custom_theme AS C JOIN local AS L WHERE  C.customTheme="여름" AND L.localCity="부산";
    // banner
    const bannerPromise = db.Banner.findAll({ limit: 4, raw: true, nest: true });

    const initQuery = `SELECT C.customThemeTitle, L.localTitle 
                            FROM custom_theme AS C JOIN local AS L 
                            WHERE  C.customTheme=:theme AND L.localCity=:region`;

    const initPromise = db.sequelize.query(initQuery, {
      type: QueryTypes.SELECT,
      replacements: { theme: theme, region: region },
      raw: true,
      nest: true,
    });

    const trendQuery = `SELECT P.id, P.title,  count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, 
                            T.region, I.image1, T.region, T.theme, T.warning
                            FROM (SELECT id, title FROM post) AS P
                            LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                            LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                            INNER JOIN post_has_image as I
                            INNER JOIN post_has_tags as T
                            WHERE I.postId = P.id and I.postId = T.postId
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;

    const trendPromise = db.sequelize.query(trendQuery, {
      type: QueryTypes.SELECT,
      replacements: { userId: userId },
      raw: true,
      nest: true,
    });

    const themeQuery = `SELECT P.id, P.title, count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite,
                            I.image1, T.region, T.theme, T.warning
                            FROM post as P
                            INNER JOIN post_has_image AS I
                            INNER JOIN post_has_tags AS T
                            LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                            LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                            WHERE P.id in (SELECT postId FROM post_has_theme WHERE themeName=:theme)
                            AND P.id = I.postId AND I.postId = T.postId
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;

    const themePromise = db.sequelize.query(themeQuery, {
      type: QueryTypes.SELECT,
      replacements: { userId: userId, theme: theme },
      raw: true,
      nest: true,
    });

    const localQuery = `SELECT P.id, P.title,  count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, 
                            T.region, I.image1, T.region, T.theme, T.warning
                            FROM (SELECT id, title FROM post WHERE region=:region) AS P
                            LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                            LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                            INNER JOIN post_has_image as I
                            INNER JOIN post_has_tags as T
                            WHERE I.postId = P.id and I.postId = T.postId
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;

    const localPromise = db.sequelize.query(localQuery, {
      type: QueryTypes.SELECT,
      replacements: { userId: userId, region: region },
      raw: true,
      nest: true,
    });

    const todayQuery = `SELECT P.id, P.title,  count(countLike.PostId) as favoriteCount, count(isLike.PostId) as isFavorite, 
                            T.region, I.image1, T.region, T.theme, T.warning
                            FROM (SELECT id, title FROM post WHERE region=:region) AS P
                            LEFT OUTER JOIN liked_post as countLike ON(P.id = countLike.PostId)
                            LEFT OUTER JOIN liked_post as isLike ON(isLike.PostId = P.id  and isLike.UserId =:userId)
                            INNER JOIN post_has_image as I
                            INNER JOIN post_has_tags as T
                            WHERE I.postId = P.id and I.postId = T.postId
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 4`;

    const todayPromise = db.sequelize.query(todayQuery, {
      type: QueryTypes.SELECT,
      replacements: { userId: userId, region: region },
      raw: true,
      nest: true,
    });

    await Promise.all([
      bannerPromise,
      todayPromise,
      trendPromise,
      themePromise,
      localPromise,
      initPromise,
      todayPromise,
    ])
      .then(async (response) => {
        const bannerResult: any = response[0]; // banner

        for (let idx in bannerResult) {
          const tempBanner: bannerDTO = {
            bannerTitle: bannerResult[idx]['bannerTitle'],
            bannerImage: bannerResult[idx]['bannerImage'],
            bannerTag: bannerResult[idx]['bannerTag'],
          };
          banner.push(tempBanner);
        }

        const trendResult: any = response[2]; // trend
        await makeBriefCollection(trendResult, trend);

        const themeResult: any = response[3]; // theme
        await makeBriefCollection(themeResult, custom);

        const localResult: any = response[4]; // local
        await makeBriefCollection(localResult, local);

        const initResult: any = response[5];
        main.customThemeTitle = initResult[0]['customThemeTitle'];
        main.localTitle = initResult[0]['localTitle'];

        const todayResult: any = response[6]; // today
        await makeBriefCollection(todayResult, today);
      })
      .catch((err) => {
        throw err;
      });

    return {
      status: 200,
      data: {
        success: true,
        msg: 'successfully load main view data',
        data: main,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: 502,
      data: {
        success: false,
        msg: 'DB main view loading error',
      },
    };
  }
}
