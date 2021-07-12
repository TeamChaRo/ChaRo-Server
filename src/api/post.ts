import express from "express";
const router = express.Router();
import { likePostController } from "../controller";

/**
 *  @route Post /post/like
 *  @desc like
 *  @access Public
 */
router.post(
    "/like",
    likePostController
)