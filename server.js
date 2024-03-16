// server.js

import express from 'express';
import cors from 'cors';
import { fetchCollection } from './src/mongodb/mongoDbClient.js'; // Importera fetchCollection-funktionen
import hamsterRouter from './src/router/hamsterRouter.js'; // Importera hamsterRouter

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Gör databasen tillgänglig för alla router-filer
app.use((req, res, next) => {
  req.db = fetchCollection(); // Lägg till databasen i request-objektet
  next();
});

// Använd hamsterRouter för att hantera hamster-relaterade endpoints
app.use('/hamsters', hamsterRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
