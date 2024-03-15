// hamsterRouter.js

import express from 'express';
import { fetchCollection } from '../mongodb/mongoDbClient.js';

const router = express.Router();

// GET /hamsters
router.get('/', async (req, res) => {
  try {
    const hamsters = await fetchCollection('hamsters').find().toArray();
    res.json(hamsters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /hamsters
router.post('/', async (req, res) => {
  const { id, name, ref, votes } = req.body;
  
  const hamster = {
    id: id,
    name: name,
    ref: ref,
    votes: votes
  };

  try {
    const collection = fetchCollection('hamsters');
    await collection.insertOne(hamster);
    res.status(201).json(hamster);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /hamsters/:id
router.get('/:id', async (req, res) => {
  try {
    const collection = fetchCollection('hamsters');
    const hamster = await collection.findOne({ _id: req.params.id });
    if (!hamster) {
      return res.status(404).json({ message: 'Hamster not found' });
    }
    res.json(hamster);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /hamsters/:id
router.delete('/:id', async (req, res) => {
  try {
    const collection = fetchCollection('hamsters');
    const result = await collection.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Hamster not found' });
    }
    res.json({ message: 'Hamster deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /hamsters/pair
router.get('/pair', async (req, res) => {
  try {
    const collection = fetchCollection('hamsters');
    const hamsters = await collection.aggregate([{ $sample: { size: 2 } }]).toArray();
    res.json(hamsters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /hamsters/pair/:wonId/:lostId
router.put('/pair/:wonId/:lostId', async (req, res) => {
  try {
    const { wonId, lostId } = req.params;
    const collection = fetchCollection('hamsters');

    // Här kan du implementera logiken för att uppdatera röstinforamtionen för vinnande och förlorande hamstrar

    res.json({ message: 'Votes updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /hamsters/pair/:wonId/:lostId
router.patch('/pair/:wonId/:lostId', async (req, res) => {
  try {
    const { wonId, lostId } = req.params;
    const collection = fetchCollection('hamsters');

    // Här kan du implementera logiken för att uppdatera röstinforamtionen för vinnande och förlorande hamstrar

    res.json({ message: 'Votes updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
