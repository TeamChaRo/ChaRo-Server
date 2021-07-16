import express from 'express';
const router = express.Router();
import { likePostController, savePostController } from '../controller';

/**
 *  @route Post /post/like
 *  @desc like post
 *  @access Public
 */
router.post('/like', likePostController);

/**
 *  @route Post /post/save
 *  @desc save post
 *  @access Public
 */
router.post('/save', savePostController);

module.exports = router;
