const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userModels');

router.post('/register', async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(422).json({ msg: "Insira todos os dados!" });
    }

    if (password !== confirmPassword) {
        return res.status(402).json({ msg: "As senhas não conferem!" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(402).json({ msg: "Usuário já cadastrado!" });
    }
    
    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        const newUser = await user.save();
        res.status(201).json({ user: newUser, msg: "Usuário cadastrado com sucesso!" });
    } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error, msg: "Erro ao cadastrar usuário!" });
}

});

module.exports = router;