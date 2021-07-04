import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import auth from "../middleware/auth";
import User from "../models/User";

/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post(
  "/", 
);

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth, async function (req: Request, res: Response) {
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Err");
  }
});

module.exports = router;
