import express, { Request, Response, Router } from "express";
//import { check, validationResult } from "express-validator";

const router = express.Router();

const upload = require("../middleware/image");


/**
 *  @route Post api/image
 *  @desc image upload
 *  @access Public
 */

 /** 
  * 이미지를 넣고 해당 URL을 바로 리턴 받 기 ?!
  * DB에 UserID 랑 이미지를 따로 저장하기 ( 배열 마냥 ? ?!? )
  * 결국 Id 값은 넣긴 넣어ㅑ함
  */
router.post(
    "/",
    upload.single('image'), // 'image' key 값으로 맞춰야함
    async(req: Request, res: Response)=>{
        try{
            console.log("successfully uploaded", res);
            // URL -> res.location 
            res.json({ "msg" : "success!"})
        }catch(err){
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = router;