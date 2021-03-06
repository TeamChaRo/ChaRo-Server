import { Request, Response } from 'express';
import modifyPostService from '../service/modifyPostService';
import writePostDTO from '../interface/req/writePostDTO';

import { db } from '../models';
import { QueryTypes } from 'sequelize';

export default async (req: Request, res: Response) => {
  const postId = req.body.postId;
  const deleted = req.body.deleted;

  // images path
  let imagesPath: string[] = [];

  if (req.files) {
    for (let file of req.files as Express.MulterS3.File[])
      imagesPath.push((file as Express.MulterS3.File).location);
  }

  let notDeleted: string[] = [];

  const getImageQuery = `SELECT * FROM post_has_image WHERE postId=3`;
  const result = await db.sequelize.query(getImageQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    nest: true,
  });

  const imageResult = result[0];
  const standard = 'image';
  for (let i = 1; i < 7; i++) {
    const tempKey = standard + i.toString();
    if (imageResult[tempKey]) {
      notDeleted.push(imageResult[tempKey]);
    }
  }

  for (let value of deleted) {
    const index = notDeleted.indexOf(value);
    notDeleted.splice(index, 1);
  }

  imagesPath.unshift.apply(imagesPath, notDeleted);

  let warning: boolean[] = [];

  const rawWarning = req.body.warning;
  for (let idx in rawWarning) {
    if (rawWarning[idx] == 'true') warning.push(true);
    else warning.push(false);
  }

  let postEntity: writePostDTO = {
    title: req.body.title,
    userId: req.body.userId,
    courseImage: imagesPath,

    province: req.body.province,
    region: req.body.region,

    theme: req.body.theme,
    warning: warning,

    isParking: req.body.isParking,
    parkingDesc: req.body.parkingDesc,

    courseDesc: req.body.courseDesc,

    course: req.body.course,
  };

  const ret = await modifyPostService(postId, deleted, postEntity);
  res.status(ret.status).json(ret.data);
};
