import express from "express";
const router = express.Router();

import  { myPageController } from "../controller";

/**
 *  @route GET /myPage/:id
 *  @desc get myPage information
 *  @access Public
 */

router.get(
    "/:id",
    myPageController
)

module.exports = router;