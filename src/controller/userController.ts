import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config";
import { check, validationResult } from "express-validator";
const router = express.Router();
import auth from "../middleware/auth";
import User from "../models/User";



module.exports = {
    signup : [
        check("email", "Please include a valid email").isEmail(), //이메일 형식인지 검사
        check("password", "Password is required").exists(),
      ],
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
    
        try {
            let user = await User.findOne({ 
                where: {
                email,
              }, 
            });
    
          if (!user) {
            res.status(400).json({
              errors: [{ msg: "Invalid Credentials" }],
            });
          }
          // Encrpyt password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.status(400).json({
              errors: [{ msg: "Invalid Credentials" }],
            });
          }
          await user.save();
    
          // Return jsonwebtoken
          const payload = {
            user: {
              id: user.userId,
            },
          };
          jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      } 
}