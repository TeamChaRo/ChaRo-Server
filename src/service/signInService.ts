import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { resolve } from "path";


export default async function signIn(id: string, password: string){
        try {
            let user = await User.findOne({ // find : 여러 개 불러오는거 findOne = 1개 
                where: {
                id : id,
              },
             // attributes : ['id','nickname'], // mongoose에서 select이랑 같은 친구 dto : {id :number, nickname:string}
            });

          if (!user) {
            return {
              status : 400,
              data : {
                errors: [{ msg: "유저없음" }],
              }
            }
          }

        //bcrypt 손보기
          await bcrypt.hash(password, 10, function(err, hash) {
            if (err) { throw (err); }
            
            bcrypt.compare(user.password, hash, function(err, result) {
                if (err) { throw (err); }
                // 일치
                if (!result) {
                  return {
                    status : 400,
                    data : {
                      errors: [{ msg: "패스워드오류" }],
                    }
                  }
                }
            });
          });
          
          //Encrpyt password
          // const isMatch = await bcrypt.compare(password, user.password);
          // console.log(isMatch);
          // if (user.password == password){
          //   console.log("!!true")
          // }
          // console.log(user.password === password);
          // console.log(password);
          // console.log(isMatch);
          // if (!isMatch) {
          //   return {
          //     status : 400,
          //     data : {
          //       errors: [{ msg: "패스워드오류" }],
          //     }
          //   }
          // }
       
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
                    console.log("오니?", token);
                    
                    // return {
                    //   status : 200,
                    //   data : {
                    //     token: token,
                    //   }
                    // }
                  }
                )
            })
          }

          return {
            status:200,
            data:{
              "success" : true, 
              "message" : "로그인에 성공하였습니다.",
              "data" : {
                userId: user.id,
                nickname: user.nickname,
                token: await token()
              }
            }
          }
          // jwt.sign(
          //   payload,
          //   config.jwtSecret,
          //   { expiresIn: 36000 },
          //   (err, token) => {
          //     if (err) throw err;
          //     console.log("오니?");
          //     return {
          //       status : 200,
          //       data : {
          //         token: token,
          //       }
          //     }
          //   }
          // );
        } catch (err) {
          console.error(err.message);
          return {
            status : 500,
            data : {
              errors: [{ msg: "Server Error" }],
            }
          }
        }
    }
