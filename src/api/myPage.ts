import express from "express";
const router = express.Router();

import  { myPageController } from "../controller";

/**
 *  @route GET /myPage/like/:id
 *  @desc get myPage information
 *  @access Public
 */

router.get(
    "/like/:id",
    myPageController
)

module.exports = router;