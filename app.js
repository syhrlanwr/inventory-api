const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/database');
const port = 5000;
const Rak = require('./models/Rak');


try {
  db.authenticate();
  console.log('Database connected');
} catch (error) {
  console.log(error);
}


app.use(cors());

app.use(express.json());

app.use('/rak', require('./routes/rak'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
