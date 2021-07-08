import express from "express";
const router = express.Router();
import { previewController } from "../controller";
/**
 *  @route Post /preview/:identifier
 *  @desc return data when click "more"
 *  @access Public
 */

router.get(
    "/:userId/:identifier",
    previewController
)

module.exports = router;