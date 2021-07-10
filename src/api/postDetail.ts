import express from "express";
const router = express.Router();
import { postDetailController }  from "../controller";

/**
 *  @route Get /:postId?value
 *  @desc return data when click Post
 *  @access Public
 */

router.get(
    "/:postId",
    postDetailController
)

module.exports = router;