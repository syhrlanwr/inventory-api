const express = require('express');
const app = express();
const db = require('./config/database');
const port = 3001;
const Rak = require('./models/Rak');
const Jenis = require('./models/Jenis');
const Satuan = require('./models/Satuan');
const Barang = require('./models/Barang');


try {
    db.authenticate();
    console.log('Database connected');
    Satuan.sync()
} catch (error) {
    console.log(error);
}

app.use(express.json());


app.use('/rak', require('./routes/rak'));
app.use('/jenis', require('./routes/jenis'));
app.use('/satuan', require('./routes/satuan'));
app.use('/barang', require('./routes/barang'));



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})