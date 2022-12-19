const Pegawai = require('../models/Pegawai');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const pegawai = await Pegawai.findAll();
  res.json(pegawai);
});

router.post('/', async (req, res) => {
  const nama = req.body.nama;
  const username = req.body.username;
  const password = req.body.password;
  const users = await users.create({
    nama: nama,
    username: username,
    password: password,
  });
  res.json(users);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const nama = req.body.nama;
  const username = req.body.username;
  const password = req.body.password;
  const users = await users.update(
    {
      nama: nama,
      username: username,
      password: password,
    },
    {
      where: {
        id: id,
      },
    }
  );
  req.json(users);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const users = await Users.destroy({
    where: {
      id: id,
    },
  });
  res.json(users);
});

module.exports = router;
