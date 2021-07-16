import { Request, Response } from 'express';
import Post from '../models/Post';
import postDetailService from '../service/postDetailService';

export default async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  try {
    let post = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      res.status(400).json({
        success: false,
        msg: '파라미터값이 올바르지 않습니다.',
      });
    } else {
      let getPostDetailService = await postDetailService(userId, postId);
      return res.status(getPostDetailService.status).json(getPostDetailService.data);
    }
  } catch {
    res.status(500).json({
      success: false,
      msg: '서버 내부 오류',
    });
  }
};
