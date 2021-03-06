import { db } from '../models';
import { QueryTypes } from 'sequelize';

import { myPageDTO, myPagePreview, myPageUser } from '../interface/res/myPageDTO';

function insertMyPage(query: string, userId: string, posts: myPagePreview[]) {
  return new Promise((resolve) => {
    db.sequelize
      .query(query, {
        replacements: { userId: userId },
        type: QueryTypes.SELECT,
        raw: true,
        nest: true,
      })
      .then((results) => {
        if (results.length == 0) resolve(0);
        results.map((result) => {
          const date = (result['date'] as string).split('-');
          const temp: myPagePreview = {
            postId: result['id'],
            title: result['title'],
            image: result['image1'],
            tags: [],
            favoriteNum: result['favoriteCount'],
            saveNum: result['saveCount'],
            year: date[0],
            month: date[1],
            day: date[2],
          };

          temp.tags.push(result['region']);
          temp.tags.push(result['theme']);

          const warningTag = result['warning'];
          if (warningTag) temp.tags.push(warningTag);

          posts.push(temp);

          if (posts.length == results.length) {
            resolve(results.length);
          }
        });
      });
  });
}

export async function likeService(userId: string) {
  try {
    let user: myPageUser = {
      nickname: '',
      profileImage: '',
      following: 0,
      follower: 0,
    };
    let writtenPost: myPagePreview[] = [];
    let savedPost: myPagePreview[] = [];

    const myPage: myPageDTO = {
      userInformation: user,
      writtenTotal: 0,
      writtenPost: writtenPost,
      savedTotal: 0,
      savedPost: savedPost,
    };

    const writtenQuery = `SELECT P.id, P.title, DATE_FORMAT(P.createdAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(saved_post.PostId) as saveCount
                            FROM (SELECT id, title, createdAt FROM post WHERE userId=:userId) as P
                            LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                            LEFT OUTER JOIN saved_post ON(P.id = saved_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 7`;

    const savedQuery = `SELECT P.id, P.title, DATE_FORMAT(P.createdAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(S.postId) as saveCount
                            FROM (SELECT PostId AS postId FROM saved_post WHERE userId=:userId) as S
                            INNER JOIN post as P
                            LEFT OUTER JOIN liked_post ON(S.postId = liked_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE S.postId=P.id and T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY favoriteCount DESC LIMIT 7`;

    const writtenPostPromise = insertMyPage(writtenQuery, userId, writtenPost);
    const savedPostPromise = insertMyPage(savedQuery, userId, savedPost);

    const followingQuery = `SELECT count(A.follower) AS following, user.nickname AS nickname, user.profileImage AS profileImage
                                FROM user 
                                INNER JOIN follow AS A 
                                WHERE user.id= :userId AND user.id = A.followed`;
    const followPromise = db.sequelize.query(followingQuery, {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
      raw: true,
      nest: true,
    });

    const followerQuery = `SELECT count(B.followed) AS follower
                                FROM user 
                                INNER JOIN follow AS B
                                WHERE user.id= :userId AND user.id = B.follower`;
    const followerPromise = db.sequelize.query(followerQuery, {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
      raw: true,
      nest: true,
    });

    await Promise.all([savedPostPromise, writtenPostPromise, followPromise, followerPromise]).then(
      (response) => {
        const savedCount = response[0] as number;
        const writtenCount = response[1] as number;
        myPage.writtenTotal = writtenCount;
        myPage.savedTotal = savedCount;

        const followResult = response[2][0];
        user.following = followResult['following'];
        user.nickname = followResult['nickname'];
        user.profileImage = followResult['profileImage'];

        const followerCount = response[3][0]['follower'];
        user.follower = followerCount;
      }
    );

    return {
      status: 200,
      data: {
        success: true,
        msg: 'successfully load main view data',
        data: myPage,
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

export async function newService(userId: string) {
  try {
    let user: myPageUser = {
      nickname: '',
      profileImage: '',
      following: 0,
      follower: 0,
    };
    let writtenPost: myPagePreview[] = [];
    let savedPost: myPagePreview[] = [];

    const myPage: myPageDTO = {
      userInformation: user,
      writtenTotal: 0,
      writtenPost: writtenPost,
      savedTotal: 0,
      savedPost: savedPost,
    };

    const writtenQuery = `SELECT P.id, P.title, DATE_FORMAT(P.createdAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(saved_post.PostId) as saveCount
                            FROM (SELECT id, title, createdAt FROM post WHERE userId=:userId) as P
                            LEFT OUTER JOIN liked_post ON(P.id = liked_post.PostId)
                            LEFT OUTER JOIN saved_post ON(P.id = saved_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY date DESC LIMIT 7`;

    const savedQuery = `SELECT P.id, P.title, DATE_FORMAT(P.createdAt, '%Y-%m-%d') as date, I.image1,
                            T.region, T.theme, T.warning, count(liked_post.PostId) as favoriteCount, count(S.postId) as saveCount
                            FROM (SELECT PostId AS postId FROM saved_post WHERE userId=:userId) as S
                            INNER JOIN post as P
                            LEFT OUTER JOIN liked_post ON(S.postId = liked_post.PostId)
                            INNER JOIN post_has_image as I 
                            INNER JOIN post_has_tags as T 
                            WHERE S.postId=P.id and T.postId=P.id AND I.postId=P.id
                            GROUP BY P.id ORDER BY date DESC LIMIT 7`;

    const writtenPostPromise = insertMyPage(writtenQuery, userId, writtenPost);
    const savedPostPromise = insertMyPage(savedQuery, userId, savedPost);

    const followingQuery = `SELECT count(A.follower) AS following, user.nickname AS nickname, user.profileImage AS profileImage
                                FROM user 
                                INNER JOIN follow AS A 
                                WHERE user.id= :userId AND user.id = A.followed`;
    const followPromise = db.sequelize.query(followingQuery, {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
      raw: true,
      nest: true,
    });

    const followerQuery = `SELECT count(B.followed) AS follower
                                FROM user 
                                INNER JOIN follow AS B
                                WHERE user.id= :userId AND user.id = B.follower`;
    const followerPromise = db.sequelize.query(followerQuery, {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
      raw: true,
      nest: true,
    });

    await Promise.all([savedPostPromise, writtenPostPromise, followPromise, followerPromise]).then(
      (response) => {
        const savedCount = response[0] as number;
        const writtenCount = response[1] as number;
        myPage.writtenTotal = writtenCount;
        myPage.savedTotal = savedCount;

        const followResult = response[2][0];
        user.following = followResult['following'];
        user.nickname = followResult['nickname'];
        user.profileImage = followResult['profileImage'];

        const followerCount = response[3][0]['follower'];
        user.follower = followerCount;
      }
    );
    return {
      status: 200,
      data: {
        success: true,
        msg: 'successfully load main view data',
        data: myPage,
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
