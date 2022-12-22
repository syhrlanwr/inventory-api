const Pegawai = require('../models/Pegawai');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const pegawai = await Pegawai.findAll();
  res.json(pegawai);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const pegawai = await Pegawai.findOne({
    where: {
      id: id,
    },
  });
  res.json(pegawai);
});

router.post('/', async (req, res) => {
  const nama = req.body.nama;
  const nip = req.body.nip;
  const pegawai = await Pegawai.create({
    nama: nama,
    nip: nip,
  });
  res.json(pegawai);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const nama = req.body.nama;
  const nip = req.body.username;
  const users = await Users.findOne({
      where: {
          id: id
      }
  });
  res.json(users);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const nama = req.body.nama;
  const nip = req.body.nip;
  const pegawai = await Pegawai.update(
    {
      nama: nama,
      nip: nip,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.json(pegawai);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const pegawai = await Pegawai.destroy({
    where: {
      id: id,
    },
  });
  res.json(pegawai);
});

module.exports = router;
