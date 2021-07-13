import express from "express";
import { likeSearchController } from "../controller/searchController";
const router = express.Router();

/**
 *  @route Post /search/like
 *  @desc 좋아요순 검색하기
 *  @access Public
 */
router.post(
    "/like",
    likeSearchController
);

module.exports = router;
