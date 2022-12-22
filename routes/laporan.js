const router = require('express').Router();
const Laporan = require('../models/Laporan');

router.get('/', async (req, res) => {
    const laporan = await Laporan.findAll();
    res.json(laporan);
})

module.exports = router;