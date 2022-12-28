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
const verifyToken = require('./middleware/verifyToken');

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

app.use('/rak', verifyToken, require('./routes/rak'));
app.use('/jenis', verifyToken, require('./routes/jenis'));
app.use('/satuan', verifyToken, require('./routes/satuan'));
app.use('/barang', verifyToken, require('./routes/barang'));
app.use('/pegawai', verifyToken, require('./routes/pegawai'));
app.use('/users', verifyToken, require('./routes/users'));
app.use('/barangkeluar', verifyToken, require('./routes/barangkeluar'));
app.use('/pengembalian', verifyToken, require('./routes/pengembalian'));
app.use('/laporan', verifyToken, require('./routes/laporan'));


app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
