// hamsterRouter.js

import express from 'express';
import hamsterController from '../controller/hamsterController.js';

const router = express.Router();

router
  .get('/', hamsterController.getAllHamsters)
  .post('/', hamsterController.createHamster)
  .get('/pair', hamsterController.getHamsterPair)
  .patch('/pair/:wonId/:lostId', hamsterController.updateHamsterPair)
  .get('/:id', hamsterController.getHamster)
  .delete('/:id', hamsterController.deleteHamster);

export default router;
