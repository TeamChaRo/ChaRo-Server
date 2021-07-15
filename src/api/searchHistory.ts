import express from 'express';
const router = express.Router();

import { saveHistoryController, loadHistoryController } from '../controller';

/**
 *  @route Post /searchHistory
 *  @desc save user's searchHistory -> 동일 데이터에는 시간 업데이트
 *  @access Public
 */
router.post('/', saveHistoryController);

/**
 *  @route Get /searchHistory/:id
 *  @desc load user's searchHistory -> 최근 시간 순
 *  @access Public
 */
router.get('/:id', loadHistoryController);

module.exports = router;
