const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuariosDB = require("../model/usuariosModel");

require("dotenv").config();

app.post("/api/login", login);

function login(req, res) {
    const { email, password } = req.body;

    //validacion de contraseña
    usuariosDB.getPwdByNick(email, async (err, result) => {
     
        if (err)
            return res
                .status(500)
                .send({ message: "Ocurrió un error.", detail: err });
        if (result.length === 0)
            return res.status(404).send("No existe este usuario.");
        const match = await bcrypt.compare(password, result[0].password);
        if (!match) return res.status(403).send("Email o contraseña inválida.");
       
     
        //Generacion de Token JWT
        //salida -> enviar token

        const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "120m"});
        return res.json({ accessToken });
    });
}

function verifyToken(req, res, next) {
    const token = req.get("authorization");
    if (!token) return res.status(401).send("No hay token de acceso");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Ocurrió un error");
        req.user = user;
        next();
    
    });
}

module.exports = { app, verifyToken };
