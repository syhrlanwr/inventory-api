const router = require('express').Router();
const Pengembalian = require('../models/Pengembalian');
const Barang = require('../models/Barang');
const BarangKeluar = require('../models/BarangKeluar');
const Laporan = require('../models/Laporan');
const Satuan = require('../models/Satuan');
const Users = require('../models/Users');
const Pegawai = require('../models/Pegawai');

router.get('/', async (req, res) => {
    const pengembalian = await Pengembalian.findAll({
        include: [
            {
                model: BarangKeluar,
                as: 'barangkeluar',
                include: [
                    {
                        model: Barang,
                        as: 'barang',
                        include: [
                            'satuan',
                        ]
                    },
                    'pegawai'
                ]
            },
            'user'
        ]
    });
    res.json(pengembalian);
});

router.post('/', async (req, res) => {
    const {
        barangkeluar_id,
        jumlah,
        user_id,
    } = req.body;
    const pengembalian = await Pengembalian.create({
        barangkeluar_id : barangkeluar_id,
        jumlah : jumlah,
        user_id : user_id,
    });

    const barangkeluar = await BarangKeluar.findOne({
        where: {
            id: barangkeluar_id
        }
    });

    const barang = await Barang.findOne({
        where: {
            id: barangkeluar.barang_id
        }
    });

    const peminjam = await Pegawai.findOne({
        where: {
            id: barangkeluar.pegawai_id
        }
    });
    const satuan = await Satuan.findOne({
        where: {
            id: barang.satuan_id
        }
    });

    const user = await Users.findOne({
        where: {
            id: user_id
        }
    });

    const laporan = await Laporan.create({
        nama_barang: barang.nama,
        jumlah : jumlah + ' ' + satuan.nama,
        peminjam: peminjam.nama,
        user: user.name,
        tanggal: new Date(),
        keterangan: 'kembali'
    });

    const jumlahBarang = parseInt(barang.jumlah) + parseInt(jumlah);

    barang.jumlah = jumlahBarang;
    barang.save();

    res.json(pengembalian);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const pengembalian = await Pengembalian.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: BarangKeluar,
                as: 'barangkeluar',
                include: [
                    {
                        model: Barang,
                        as: 'barang',
                        include: [
                            'satuan',
                        ]
                    },
                    'pegawai'
                ]
            },
            'user'
        ]
    });
    res.json(pengembalian);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        barangkeluar_id,
        jumlah,
        user_id,
        pegawai_id
    } = req.body;
    const pengembalian = await Pengembalian.findOne({
        where: {
            id: id
        }
    });

    const barangkeluar = await BarangKeluar.findOne({
        where: {
            id: barangkeluar_id
        }
    });

    const barang = await Barang.findOne({
        where: {
            id: barangkeluar.barang_id
        }
    });

    const jumlahBarang = parseInt(barang.jumlah) - parseInt(pengembalian.jumlah) + parseInt(jumlah);

    barang.jumlah = jumlahBarang;
    barang.save();

    res.json(pengembalian);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const pengembalian = await Pengembalian.destroy({
        where: {
            id: id
        }
    });
    res.json(pengembalian);
});

module.exports = router;