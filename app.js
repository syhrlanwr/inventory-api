const express = require('express');
const app = express();
const db = require('./config/database');
const port = 5000;
const Rak = require('./models/Rak');

const Jenis = require('./models/Jenis');
const Satuan = require('./models/Satuan');
const Barang = require('./models/Barang');
const Pegawai = require('./models/Pegawai');
const Users = require('./models/Users');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const BarangKeluar = require('./models/BarangKeluar');
const Pengembalian = require('./models/Pengembalian');
const Laporan = require('./models/Laporan');

try {
  db.authenticate();
  console.log('Database connected');
  Laporan.sync();
} catch (error) {
  console.log(error);
}


app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/rak', require('./routes/rak'));
app.use('/jenis', require('./routes/jenis'));
app.use('/satuan', require('./routes/satuan'));
app.use('/barang', require('./routes/barang'));
app.use('/pegawai', require('./routes/pegawai'));
app.use('/users', require('./routes/users'));
app.use('/barangkeluar', require('./routes/barangkeluar'));
app.use('/pengembalian', require('./routes/pengembalian'));
app.use('/laporan', require('./routes/laporan'));


app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
