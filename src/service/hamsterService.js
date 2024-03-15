//hamsterService.js

import { fetchCollection } from "../mongodb/mongoDbClient.js";

const HAMSTERS_COLLECTION_NAME = "hamsters";

const getAllHamsters = async () => {
  try {
    const hamsters = await fetchCollection(HAMSTERS_COLLECTION_NAME).find().toArray();
    return hamsters;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createHamster = async (hamsterData) => {
  try {
    if (!hamsterData || !hamsterData.votes) {
      throw new Error('Invalid hamster data provided');
    }

    if (!Array.isArray(hamsterData.votes) || hamsterData.votes.length === 0) {
      hamsterData.votes = [{ lost: 0, won: 0 }];
    }

    const collection = fetchCollection(HAMSTERS_COLLECTION_NAME);
    const result = await collection.insertOne(hamsterData);
    return hamsterData;
  } catch (err) {
    throw new Error(err.message);
  }
};

// const getHamsterById = async (id) => {
//   try {
//     const collection = fetchCollection(HAMSTERS_COLLECTION_NAME);
//     const hamster = await collection.findOne({ id: id });
//     if (!hamster) {
//       throw new Error('Hamster not found');
//     }
//     return hamster;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// const deleteHamsterById = async (id) => {
//   try {
//     const collection = fetchCollection(HAMSTERS_COLLECTION_NAME);
//     const result = await collection.deleteOne({ id: id });
//     if (result.deletedCount === 0) {
//       throw new Error('Hamster not found');
//     }
//     return { message: 'Hamster deleted' };
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

const getHamsterById = async (id) => {
    try {
      const collection = fetchCollection(HAMSTERS_COLLECTION_NAME);
      const hamster = await collection.findOne({ id: Number(id) });
      if (!hamster) {
        throw new Error('Hamster not found');
      }
      return hamster;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  const deleteHamsterById = async (id) => {
    try {
      const collection = fetchCollection(HAMSTERS_COLLECTION_NAME);
      const result = await collection.deleteOne({ id: Number(id) });
      if (result.deletedCount === 0) {
        throw new Error('Hamster not found');
      }
      return { message: 'Hamster deleted' };
    } catch (err) {
      throw new Error(err.message);
    }
  };

const getHamsterPair = async () => {
  try {
    const collection = fetchCollection(HAMSTERS_COLLECTION_NAME);
    const hamsters = await collection.aggregate([{ $sample: { size: 2 } }]).toArray();
    return hamsters;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default { getAllHamsters, createHamster, getHamsterById, deleteHamsterById, getHamsterPair };
