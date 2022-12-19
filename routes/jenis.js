const Jenis = require('../models/Jenis');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const jenis = await Jenis.findAll();
    res.json(jenis);
});

router.post('/', async (req, res) => {
    const nama = req.body.nama;
    const jenis = await Jenis.create({
        nama : nama
    });
    res.json(jenis);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const jenis = await Jenis.update({
        nama : nama
    }, {
        where: {
            id: id
        }
    });
    res.json(jenis);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const jenis = await Jenis.destroy({
        where: {
            id: id
        }
    });
    res.json(jenis);
});

module.exports = router;