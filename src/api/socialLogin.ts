import express from 'express';
import { authorizeUrl, googleLoginController } from '../controller';
const router = express.Router();

/**
 *  @route GET /socialLogin/google
 *  @desc 구글 소셜 로그인하기
 *  @access Public
 */
router.get('/google', function (req, res) {
  res.redirect(authorizeUrl);
});

/**
 *  @route GET /socialLogin/google/callback
 *  @desc 구글 소셜 로그인 결과 반환(유저 정보 반환)
 *  @access Public
 */
router.get('/google/callback', googleLoginController);

module.exports = router;
