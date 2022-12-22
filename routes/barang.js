const Barang = require('../models/Barang');
const Laporan = require('../models/Laporan');
const Rak = require('../models/Rak');
const Satuan = require('../models/Satuan');
const Jenis = require('../models/Jenis');
const Pegawai = require('../models/Pegawai');
const Users = require('../models/Users');
const BarangKeluar = require('../models/BarangKeluar');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const barang = await Barang.findAll({
        include: [
            'jenis',
            'rak',
            'satuan',
            'pegawai',
            'user'
        ]
    });
    res.json(barang);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const barang = await Barang.findOne({
        where: {
            id: id
        },
        include: [
            'jenis',
            'rak',
            'satuan',
            'pegawai',
            'user'
        ]
    });
    res.json(barang);
});


router.post('/', async (req, res) => {
    const nama = req.body.nama;
    const jenis_id = req.body.jenis_id;
    const jumlah = req.body.jumlah;
    const rak_id = req.body.rak_id;
    const satuan_id = req.body.satuan_id;
    const pegawai_id = req.body.pegawai_id;
    const user_id = req.body.user_id;
    const barang = await Barang.create({
        nama : nama,
        jenis_id : jenis_id,
        rak_id : rak_id,
        jumlah : jumlah,
        satuan_id : satuan_id,
        pegawai_id : pegawai_id,
        user_id : user_id
    });

    const peminjam = await Pegawai.findOne({
        where: {
            id: pegawai_id
        }
    });
    const satuan = await Satuan.findOne({
        where: {
            id: satuan_id
        }
    });

    const user = await Users.findOne({
        where: {
            id: user_id
        }
    });
    
    const laporan = await Laporan.create({
        nama_barang: nama,
        jumlah: jumlah + ' ' + satuan.nama,
        keterangan: 'masuk',
        user : user.name,
        peminjam: peminjam.nama,
        tanggal: new Date()
    });

    res.json(barang);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        nama,
        jenis_id,
        jumlah,
        rak_id,
        satuan_id,
        pegawai_id,
        user_id
    } = req.body;
    const barang = await Barang.update({
        nama : nama,
        jenis_id : jenis_id,
        jumlah : jumlah,
        rak_id : rak_id,
        satuan_id : satuan_id,
        pegawai_id : pegawai_id,
        user_id : user_id
    }, {
        where: {
            id: id
        }
    });
    res.json(barang);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const barang = await Barang.destroy({
        where: {
            id: id
        }
    });
    res.json(barang);
});

module.exports = router;