const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/userModels');
require("dotenv").config();

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

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: "Insira todos os dados!" });
    }

    try {

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            return res.status(401).json({ msg: "Senha não corresponde!" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json(
            {
                msg: "Login realizado com sucesso!",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        );

    } catch (error) {
        return res.status(500).json({ msg: "Erro ao processar a solicitação. Tente mais tarde! Erro: ", error: error.message });
    }

});

module.exports = router;