import express from 'express';
import { likeSearchController, newSearchController } from '../controller/searchController';
const router = express.Router();

/**
 *  @route Post /search/like
 *  @desc 인기순 검색하기
 *  @access Public
 */
router.post('/like', likeSearchController);

/**
 *  @route Post /search/new
 *  @desc 최신순 검색하기
 *  @access Public
 */
router.post('/new', newSearchController);

module.exports = router;
