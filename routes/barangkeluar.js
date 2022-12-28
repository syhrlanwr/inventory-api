const router = require('express').Router();
const BarangKeluar = require('../models/BarangKeluar');
const Barang = require('../models/Barang');
const Satuan = require('../models/Satuan');
const Pegawai = require('../models/Pegawai');
const Users = require('../models/Users');
const Laporan = require('../models/Laporan');

router.get('/', async (req, res) => {
    const barangkeluar = await BarangKeluar.findAll({
        include: [
            {
                model: Barang,
                as: 'barang',
                include: [
                    'satuan',
                ]
            },
            'user',
            'pegawai'
        ]
    });
    res.json(barangkeluar);
});

router.post('/', async (req, res) => {
    const {
        barang_id,
        jumlah,
        pegawai_id
    } = req.body;
    const user_id = req.user.userId;
    const barangkeluar = await BarangKeluar.create({
        barang_id : barang_id,
        jumlah : jumlah,
        user_id : user_id,
        pegawai_id : pegawai_id
    });

    const barang = await Barang.findOne({
        where: {
            id: barang_id
        }
    });
    
    const peminjam = await Pegawai.findOne({
        where: {
            id: pegawai_id
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
        keterangan: 'keluar'
    });
    

    const jumlahBarang = barang.jumlah - jumlah;

    const updateBarang = await Barang.update({
        jumlah : jumlahBarang
    }, {
        where: {
            id: barang_id
        }
    });

    res.json(barangkeluar);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const barangkeluar = await BarangKeluar.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Barang,
                as: 'barang',
                include: [
                    'satuan',
                ]
            },
            'user',
            'pegawai'
        ]
    });
    res.json(barangkeluar);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        barang_id,
        jumlah,
        pegawai_id
    } = req.body;
    const user_id = req.user.userId;
    const barangkeluar = await BarangKeluar.findOne({
        where: {
            id: id
        }
    });

    const barang = await Barang.findOne({
        where: {
            id: barang_id
        }
    });

    const jumlahBarang = barang.jumlah + barangkeluar.jumlah - jumlah;

    barangkeluar.barang_id = barang_id;
    barangkeluar.jumlah = jumlah;
    barangkeluar.user_id = user_id;
    barangkeluar.pegawai_id = pegawai_id;
    barangkeluar.save();
    
    barang.jumlah = jumlahBarang;
    barang.save();

    res.json(barangkeluar);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const barangkeluar = await BarangKeluar.findOne({
        where: {
            id: id
        }
    });

    const barang = await Barang.findOne({
        where: {
            id: barangkeluar.barang_id
        }
    });

    const jumlahBarang = barang.jumlah + barangkeluar.jumlah;

    barang.jumlah = jumlahBarang;
    barang.save();

    const deleteBarangKeluar = await BarangKeluar.destroy({
        where: {
            id: id
        }
    });

    res.json(barangkeluar);
});

module.exports = router;

