const express = require('express');
const app = express();
const db = require('./config/database');
const port = 3001;
const Rak = require('./models/Rak');

try {
    db.authenticate();
    console.log('Database connected');
    Rak.sync()
} catch (error) {
    console.log(error);
}

app.use(express.json());


app.use('/rak', require('./routes/rak'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})