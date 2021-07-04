import express, { Request, Response, Router, Express } from "express";
//import { check, validationResult } from "express-validator";

const router = express.Router();
import upload from "../middleware/upload";
/**
 *  @route Post api/image
 *  @desc image upload
 *  @access Public
 */

router.post(
    "/",
    upload.single('image'), // 'image' key 값으로 맞춰야함
    async(req: Request, res: Response)=>{
        try{
            // image path
            let image = (req.file as Express.MulterS3.File).location;
            console.log("successfully uploaded", image);

            res.json({ "msg" : "success!"})
        }catch(err){
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
)

router.post(
    "/ary",
    upload.array('image', 2), // 'image' key 값으로 맞춰야함
    async(req: Request, res: Response)=>{
        try{
            for(let file of req.files){
                // image path
                let image = (file as Express.MulterS3.File).location;
                console.log(image);
            }
            res.json({ "msg" : "success!"})
        }catch(err){
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
)

router.post(
    "/fields",
    upload.fields([ {name:'image1'}, {name:'image2'}]), // 'image' key 값으로 맞춰야함
    async(req: Request, res: Response)=>{
        try{
            let obj = JSON.parse(JSON.stringify(req.file))
            console.log(obj) 
            res.json({ "msg" : "success!"})
        }catch(err){
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = router;