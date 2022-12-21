const verifyToken = require('../middleware/verifyToken');
const Users = require('../models/Users');
const router = require('express').Router();

router.get('/', verifyToken ,async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const users = await Users.create({
        name: name,
        username: username,
        password: password
    });
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
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
    const users = await Users.update({
        nama : nama,
        username : username,
        password : password
    }, {
        where: {
            id: id,
        },
    });
    res.json(users);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const users = await Users.destroy({
        where: {
            id: id
        }
    });
    res.json(users);
});

module.exports = router;