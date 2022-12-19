const Barang = require('../models/Barang');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const barang = await Barang.findAll();
    res.json(satuan);
});

router.post('/', async (req, res) => {
    const nama = req.body.nama;
    const barang = await Barang.create({
        nama : nama
    });
    res.json(barang);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const barang = await Barang.update({
        nama : nama
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