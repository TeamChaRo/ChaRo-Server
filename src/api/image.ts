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
    async(req: Request, res: Response) => {
        try{
            await upload.uploadSingle(req, res, function(err){
                if(err){
                    console.log("err!", err);
                    return res.status(400).send("file upload error");
                }
                let image = (req.file as Express.MulterS3.File).location;
                console.log("successfully uploaded", image);
                return res.json({ "msg" : "success!"})
            })
        }catch(err){
            console.log("err!!!", err);
            return res.status(500).send("Server error");
        }
    }
)


// Middleware X -> for error handling
router.post(
    "/ary",
    async(req: Request, res: Response) => {
        try{
            await upload.uploadAry(req, res, function(err){
                if(err){
                    console.log("err!", err);
                    return res.status(400).send("file upload error");
                }
                for(let file of req.files){
                    // image path
                    let image = (file as Express.MulterS3.File).location;
                    console.log(image);
                }
                return res.json({ "msg" : "success!"})
            })
        }catch(err){
            console.log("err!!!", err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = router;