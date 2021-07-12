import User from "../models/User";
import { db } from "../models";
import bcrypt from "bcryptjs";
import config from "../config/config";
import { Hash } from "crypto";
import userDTO from "src/interface/req/userDTO";

export default async function signUp(userEntity: userDTO) {
  try {
    
    let user = await User.findOne({
      where: {
        id: userEntity.id,
      },
    });

    if (user) {
      return {
        data: "alreadyExistUser",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordSalt = await bcrypt.hash(userEntity.password, salt);

    userEntity.password = passwordSalt;

    await db.User.create(userEntity);

    return {
      status: 200,
      data: {
        success: true,
        msg: "회원가입 성공!",
      },
    };
  } catch (err) {
    return {
      status: 500,
      data: {
        success: false,
        msg: "Server Error",
      },
    };
  }
}
