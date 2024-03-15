//hamsterController.js

import hamsterService from '../service/hamsterService.js';

// GET /hamsters
const getAllHamsters = async (req, res) => {
  try {
    const hamsters = await hamsterService.getAllHamsters();
    res.json(hamsters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /hamsters
const createHamster = async (req, res) => {
    try {
        const hamster = await hamsterService.createHamster(req.body);
        res.status(201).json(hamster); // Se till att det returnerade hamsterobjektet skickas som svar
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET /hamsters/:id
const getHamster = async (req, res) => {
  const id = req.params.id;
  try {
    const hamster = await hamsterService.getHamsterById(id);
    res.json(hamster);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE /hamsters/:id
const deleteHamster = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await hamsterService.deleteHamsterById(id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET /hamsters/pair
const getHamsterPair = async (req, res) => {
  try {
    const hamsters = await hamsterService.getHamsterPair();
    res.json(hamsters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getAllHamsters, createHamster, getHamster, deleteHamster, getHamsterPair };
