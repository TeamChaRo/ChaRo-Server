import express from "express";
import { check } from "express-validator";

const router = express.Router();
import { signInController } from "../controller/signController"


/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post(
  "/", 
  [
    check("id", "id is required").exists(), 
    check("password", "Password is required").exists(),
  ],
  signInController
);




module.exports = router;