import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";


export default async function signIn(id: string, password: string){
  try {
      let user = await User.findOne({ 
          where: {
          id : id,
        }
      });

    if (!user) {
      return {
        data: "noUserExist"
      }
    }

    //Encrpyt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        data: "passwordError"
      }
    }
 
    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    function token() {
      return new Promise((resolve, reject) => {
        jwt.sign(payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw (err);
              else resolve(token);
            }
          )
      })
    }

    return {
      status:200,
      data:{
        "success" : true, 
        "msg" : "로그인에 성공하였습니다.",
        "data" : {
          userId: user.id,
          nickname: user.nickname,
          token: await token()
        }
      }
    }
  } catch (err) {
    console.error(err.message);
    return {
      status: 500,
      data: {
        success: false,
        msg: "Server Error",
      },
    }
  }
}