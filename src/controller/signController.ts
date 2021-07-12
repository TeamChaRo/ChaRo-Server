import express, { Request, Response } from "express";
const router = express.Router();
import signIn from "../service/signInService";
import signUp from "../service/signUpService";
import checkId from "../service/idCheckService";
import checkNickname from "../service/nicknameCheckService";
import userDTO from "../interface/req/userDTO";

/*
signInController
- 로그인
*/
export async function signInController(req: Request, res: Response) {
  try {
    const { id, password } = req.body;
    const signInReturn = await signIn(id, password);

    if (signInReturn.data == "noUserExist") {
      return res.status(404).json({
        success: false,
        msg: "유저 없음",
      })
    }
    if (signInReturn.data == "passwordError") {
      return res.status(404).json({
        success: false,
        msg: "패스워드 오류",
      })
    }
    return res.status(signInReturn.status).json(signInReturn.data);
  } catch {
    res.status(500).json({
      success: false,
      msg: "서버 내부 오류",
    });
  }
}

/*
signUpController
- 회원가입
*/
export async function signUpController(req: Request, res: Response) {
  try {

    //let imagesPath: string = (req.file as Express.MulterS3.File).location;
    let signUpEntity: userDTO = {
      id: req.body.id,
      password: req.body.password,
      email: req.body.email,
      nickname: req.body.nickname,
      profileImage: req.body.profileImage,
      marketingPush: req.body.pushAgree,
      marketingEmail: req.body.emailAgree,
    };

    if (signUpEntity.profileImage == '') {
      signUpEntity.profileImage = "https://charo-server.s3.ap-northeast-2.amazonaws.com/jieun.png"
    }
    if (signUpEntity.marketingPush ==  undefined) {
      signUpEntity.marketingPush = false
    }
    if (signUpEntity.marketingEmail ==  undefined) {
      signUpEntity.marketingEmail = false
    }

    const signUpReturn = await signUp(signUpEntity);
    if (signUpReturn.data == "alreadyExistUser") {
      return res.status(404).json({
        success: false,
        msg: "이미 존재하는 유저입니다.",
      })
    }
    return res.status(signUpReturn.status).json(signUpReturn.data);

  } catch {
    res.status(500).json({
      success: false,
      msg: "서버 내부 오류",
    });
  }
}

/*
checkIdController
- 아이디 중복체크
*/
export async function checkIdController(req: Request, res: Response) {
  try {
    const { id } = req.body;

    var checkIdPw = /^[a-zA-Z0-9]{5,15}$/ 

    if(!checkIdPw.test(id)) {
      return res.status(404).json({
        success: false,
        msg: "아이디는 5~15자의 영문 대소문자와 숫자로만 입력해주세요.",
      })
    }

    const checkIdReturn = await checkId(id);

    if (checkIdReturn.data == "alreadyExistUser") {
      return res.status(404).json({
        success: false,
        msg: "이미 존재하는 id입니다.",
      })
    }
    return res.status(checkIdReturn.status).json(checkIdReturn.data);
  } catch {
    res.status(500).json({
      success: false,
      msg: "서버 내부 오류",
    });
  }
}

/*
checkNicknameController
- 닉네임 중복체크
*/
export async function checkNicknameController(req: Request, res: Response) {
  try {
    const { nickname } = req.body;
    const checkNicknameReturn = await checkNickname(nickname);

    if (checkNicknameReturn.data == "alreadyExistNickname") {
      return res.status(404).json({
        success: false,
        msg: "이미 존재하는 닉네임입니다.",
      })
    }
    return res.status(checkNicknameReturn.status).json(checkNicknameReturn.data);
  } catch {
    res.status(500).json({
      success: false,
      msg: "서버 내부 오류",
    });
  }
}

module.exports