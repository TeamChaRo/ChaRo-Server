import express from "express";
const router = express.Router();

import  { saveHistoryController, loadHistoryController } from "../controller";

/**
 *  @route Post /searchHistory
 *  @desc save user's searchHistory
 *  @access Public
 */
router.post(
    "/",
    saveHistoryController
)

router.get(
    "/:id",
    loadHistoryController
)

module.exports = router;