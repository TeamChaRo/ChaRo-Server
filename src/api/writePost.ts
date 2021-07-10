import express from "express";
//import { check, validationResult } from "express-validator";
import { writePostController } from "../controller";
import upload from "../middleware/upload";
const router = express.Router();


/**
 *  @route Post /writePost
 *  @desc write a post with images
 *  @access Public
 */
router.post(
    "/",
    upload.postImages,
    writePostController
)


module.exports = router;