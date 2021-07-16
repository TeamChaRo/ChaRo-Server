import express from 'express';
const router = express.Router();

import { modifyPostController } from '../controller';

router.post('/', modifyPostController);

module.exports = router;
