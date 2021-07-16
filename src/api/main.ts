import express from 'express';
const router = express.Router();

import { mainController } from '../controller';

router.get('/:id', mainController);

module.exports = router;
