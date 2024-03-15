// hamsterController.js

import { fetchCollection } from '../mongodb/mongoDbClient.js';

// GET /hamsters
const getAllHamsters = async (req, res) => {
  try {
    const hamsters = await fetchCollection('hamsters').find().toArray();
    res.json(hamsters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /hamsters
const createHamster = async (req, res) => {
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
};

// GET /hamsters/:id
const getHamster = async (req, res) => {
  try {
    const collection = fetchCollection('hamsters');
    const hamster = await collection.findOne({ id: req.params.id });
    if (!hamster) {
      return res.status(404).json({ message: 'Hamster not found' });
    }
    res.json(hamster);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /hamsters/:id
const deleteHamster = async (req, res) => {
  try {
    const collection = fetchCollection('hamsters');
    const result = await collection.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Hamster not found' });
    }
    res.json({ message: 'Hamster deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /hamsters/pair
const getHamsterPair = async (req, res) => {
  try {
    const collection = fetchCollection('hamsters');
    const hamsters = await collection.aggregate([{ $sample: { size: 2 } }]).toArray();
    res.json(hamsters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getAllHamsters, createHamster, getHamster, deleteHamster, getHamsterPair }