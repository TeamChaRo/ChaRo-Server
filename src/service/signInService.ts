import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";


export default async function signup(email, password){
        try {
            let user = await User.findOne({ // find : 여러 개 불러오는거 findOne = 1개 
                where: {
                email :email,
              },
              attributes : ['id','nickname'], // mongoose에서 select이랑 같은 친구 dto : {id :number, nickname:string}
            });
        
          if (!user) {
            return {
              status : 400,
              data : {
                errors: [{ msg: "Invalid Credentials" }],
              }
            }
          }
          // Encrpyt password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return {
              status : 400,
              data : {
                errors: [{ msg: "Invalid Credentials" }],
              }
            }
          }
          await user.save();
        
          // Return jsonwebtoken
          const payload = {
            user: {
              id: user.id,
            },
          };
          jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              return {
                status : 200,
                data : {
                  token: token
                }
              }
            }
          );
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
