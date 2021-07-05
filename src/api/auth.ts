import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config";
import { check, validationResult } from "express-validator";

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

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
// router.get("/", auth, async function (req: Request, res: Response) {
//   try {
//     const user = await User.findById({userId}).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Err");
//   }
// });

module.exports = router;
