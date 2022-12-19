const Satuan = require('../models/Satuan');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const satuan = await Satuan.findAll();
    res.json(satuan);
});

router.post('/', async (req, res) => {
    const nama = req.body.nama;
    const satuan = await Satuan.create({
        nama : nama
    });
    res.json(satuan);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const satuan = await Satuan.update({
        nama : nama
    }, {
        where: {
            id: id
        }
    });
    res.json(satuan);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const satuan = await Satuan.destroy({
        where: {
            id: id
        }
    });
    res.json(satuan);
});

module.exports = router;