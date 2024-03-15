// hamsterRouter.js

import express from 'express';
import hamsterController from '../controller/hamsterController.js';

const router = express.Router();

router
  .get('/', hamsterController.getAllHamsters)
  .post('/', hamsterController.createHamster)
  .get('/:id', hamsterController.getHamster)
  .delete('/:id', hamsterController.deleteHamster)
  .get('/pair', hamsterController.getHamsterPair);

export default router;
