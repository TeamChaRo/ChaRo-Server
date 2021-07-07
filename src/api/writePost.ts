import express from "express";
//import { check, validationResult } from "express-validator";
import { writePostController } from "../controller";
const router = express.Router();


/**
 *  @route Post /writeCourse
 *  @desc write a post with images
 *  @access Public
 */
router.post(
    "/",
    writePostController
)


module.exports = router;