const Rak = require('../models/Rak');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const rak = await Rak.findAll();
    res.json(rak);
});

router.post('/', async (req, res) => {
    const nama = req.body.nama;
    const rak = await Rak.create({
        nama : nama
    });
    res.json(rak);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const rak = await Rak.update({
        nama : nama
    }, {
        where: {
            id: id
        }
    });
    res.json(rak);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const rak = await Rak.destroy({
        where: {
            id: id
        }
    });
    res.json(rak);
});

module.exports = router;