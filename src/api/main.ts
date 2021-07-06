import express from "express";
const router = express.Router();

import { mainController } from "../controller";

router.get(
    "/",
    mainController
)

module.exports = router;