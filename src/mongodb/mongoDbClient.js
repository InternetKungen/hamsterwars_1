// mongoDbClient.js

import { MongoClient } from 'mongodb';
import { dbDetails } from './config.js'

let db;

const url = (username, password) => {
  return `mongodb+srv://${username}:${password}@test-cluster0.hxnsnlh.mongodb.net/?retryWrites=true&w=majority&appName=test-Cluster0`;
}

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if(db != undefined) {
    return db;
  }

  const client = new MongoClient(url(dbDetails.username, dbDetails.password));

  db = client.db("hamster-wars-v1");

  return db;
}
