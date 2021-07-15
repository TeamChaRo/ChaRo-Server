import express from 'express';
import { check } from 'express-validator';
import checkNickname from 'src/service/nicknameCheckService';
import { signInController } from '../controller/signController';
import { signUpController } from '../controller/signController';
import { checkIdController } from '../controller/signController';
import { checkNicknameController } from '../controller/signController';

const router = express.Router();

/**
 *  @route Post /sign/signIn
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post(
  '/signIn',
  [check('id', 'id is required').exists(), check('password', 'Password is required').exists()],
  signInController
);

/**
 *  @route Post /sign/signUp
 *  @desc create user (회원가입)
 *  @access Public
 */
router.post(
  '/signUp',
  [
    check('id', 'id is required').exists(),
    check('password', 'Password is required').exists(),
    check('email', 'email is required').exists(),
    check('nickname', 'nickname is required').exists(),
  ],
  signUpController
);

/**
 *  @route Post /sign/checkId
 *  @desc 아이디 중복체크
 *  @access Public
 */
router.post('/checkId', [check('id', 'id is required').exists()], checkIdController);

/**
 *  @route Post /sign/checkNickname
 *  @desc 닉네임 중복체크
 *  @access Public
 */
router.post(
  '/checkNickname',
  [check('nickname', 'nickname is required').exists()],
  checkNicknameController
);

module.exports = router;
