import express from "express";
const router = express.Router();
import { postDetailController }  from "../controller";

/**
 *  @route Get /:postId
 *  @desc return data when click Post
 *  @access Public
 */

router.get(
    "/:userId/:postId",
    postDetailController
)

module.exports = router;
