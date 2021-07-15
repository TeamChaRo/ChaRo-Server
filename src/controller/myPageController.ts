import express, { Request, Response } from 'express';

import { likeService, newService } from '../service/myPageService';

export async function likeMyPageController(req: Request, res: Response) {
  const userId = req.params.id;

  const ret = await likeService(userId);
  res.status(ret.status).json(ret.data);
}

export async function newMyPageController(req: Request, res: Response) {
  const userId = req.params.id;

  const ret = await newService(userId);
  res.status(ret.status).json(ret.data);
}
