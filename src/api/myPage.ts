import express from 'express';
const router = express.Router();

import { likeMyPageController, newMyPageController } from '../controller';

/**
 *  @route GET /myPage/like/:id
 *  @desc get myPage information based on like
 *  @access Public
 */

router.get('/like/:id', likeMyPageController);

/**
 *  @route GET /myPage/new/:id
 *  @desc get myPage information based on date
 *  @access Public
 */

router.get('/new/:id', newMyPageController);

module.exports = router;
