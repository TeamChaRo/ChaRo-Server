import express from "express";
import { check } from "express-validator";

const router = express.Router();
import signInController from "../controller/signInController"

/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post(
  "/", 
  [
    check("email", "Please include a valid email").isEmail(), //이메일 형식인지 검사
    check("password", "Password is required").exists(),
  ],
  signInController
);

module.exports = router;
