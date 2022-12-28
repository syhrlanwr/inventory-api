const router = require('express').Router();
const Laporan = require('../models/Laporan');

router.get('/', async (req, res) => {
    const laporan = await Laporan.findAll();
// sort by date descending
    laporan.sort((a, b) => {
        return new Date(b.tanggal) - new Date(a.tanggal);
    });
    res.json(laporan);
})

module.exports = router;