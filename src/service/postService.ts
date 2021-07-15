import { db } from '../models';
import { QueryTypes } from 'sequelize';

export async function likePostService(userId: string, postId: number) {
  try {
    const query = 'SELECT * FROM liked_post WHERE UserId=:userId and PostId=:postId';
    const result = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { userId: userId, postId: postId },
      nest: true,
    });

    if (result.length) {
      const deleteLike = 'DELETE FROM liked_post WHERE UserId= :userId and PostId= :postId';
      db.sequelize.query(deleteLike, {
        type: QueryTypes.DELETE,
        replacements: { userId: userId, postId: postId },
        nest: true,
      });
    } else {
      const addLike = 'INSERT INTO liked_post(UserId, PostId) VALUES(:userId, :postId)';
      db.sequelize.query(addLike, {
        type: QueryTypes.INSERT,
        replacements: { userId: userId, postId: postId },
        nest: true,
      });
    }

    return {
      status: 200,
      data: {
        success: true,
        msg: '이 메시지를 읽었으니 오늘은 행복할거에여~~~ 맛있는거 먹쟈아아므ㅏ의므라므ㅏ 성공!', //"successfully liking the post",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: 502,
      data: {
        success: false,
        msg: 'DB update error',
      },
    };
  }
}

export async function savePostService(userId: string, postId: number) {
  try {
    const query = 'SELECT * FROM saved_post WHERE UserId=:userId and PostId=:postId';
    const result = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { userId: userId, postId: postId },
      nest: true,
    });

    if (result.length) {
      const deleteLike = 'DELETE FROM saved_post WHERE UserId= :userId and PostId= :postId';
      await db.sequelize.query(deleteLike, {
        type: QueryTypes.DELETE,
        replacements: { userId: userId, postId: postId },
        nest: true,
      });
    } else {
      const addLike = 'INSERT INTO saved_post(UserId, PostId) VALUES(:userId, :postId)';
      await db.sequelize.query(addLike, {
        type: QueryTypes.INSERT,
        replacements: { userId: userId, postId: postId },
        nest: true,
      });
    }

    return {
      status: 200,
      data: {
        success: true,
        msg: '이 메시지를 읽었으니 오늘은 행복할거에여~~~ 맛있는거 먹쟈아아므ㅏ의므라므ㅏ 성공!', //"successfully liking the post",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: 502,
      data: {
        success: false,
        msg: 'DB update error',
      },
    };
  }
}
