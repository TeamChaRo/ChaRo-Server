import express from "express";
const router = express.Router();
import { likePreviewController, newPreviewController } from "../controller";


/**
 *  @route Post /preview/like/:identifier?value
 *  @desc return data when click "more" & like filter
 *  @access Public
 */
router.get(
    "/like/:userId/:identifier",
    likePreviewController
)

router.get(
    "/new/:userId/:identifier",
    newPreviewController
)


module.exports = router;