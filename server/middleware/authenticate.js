const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticate = (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        return res.status(401).json({ msg: "Acesso negado! Nenhum token fornecido." });
    }

    const token = tokenHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token inválido." });
    }
}

module.exports = authenticate;
