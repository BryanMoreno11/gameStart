const oracledb = require('oracledb');
const dbConfig = require('../database');
const speakeasy = require('speakeasy');
const { encrypt } = require("../helpers/handleBcrypt");
const { compare } = require("../helpers/handleBcrypt");


async function getUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM usuario where id_usuario=:id'
    const values = { id: id };
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el usuario segun el ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor 1" });

    }
}

async function getUsuarioNombre(req, res) {
    console.log('Entra al getUsuarioNombre');
    const { nombre } = req.params;
    const query = 'SELECT * FROM usuario where correo=:nombre'
    const values = { nombre: nombre };
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el usuario segun el nombre' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor de nombre" });

    }
}

async function getUsuarioLogin(req, res) {
    const { correo, contrasenia } = req.body;
    const query = 'SELECT * FROM usuario where correo=:correo'
    const values = { correo: correo };
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const passwordMatch = await compare(contrasenia, user.CONTRASENIA);
            if (passwordMatch) {
                res.status(200).json({ succes: true, message: 'Login exitoso' });
            } else {
                res.status(401).json({ message: 'Nombre de usuario o contrasenia incorrecto' });
            }
        } else {
            res.status(500).json({ message: 'No existe el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor 2" });
    }
}

async function verifyLogin(req, res) {
    const { plainPassword, hashPassword } = req.body;
    const passwordHash = await compare(plainPassword, hashPassword);
    if (passwordHash) {
        return true;
    } else {
        return false;
    }
}


async function createUsuario(req, res) {
    const { nombre, contrasenia, apellido, correo, telefono, rol } = req.body;
    const passwordHash = await encrypt(contrasenia);

    // Generar el secret
    const secret = speakeasy.generateSecret({ length: 20 }).base32;

    const query = 'INSERT INTO USUARIO (nombre, contrasenia, apellido, correo, telefono, rol, secret) VALUES (:nombre, :contrasenia, :apellido, :correo, :telefono, :rol, :secret)';
    const values = { nombre: nombre, contrasenia: passwordHash, apellido: apellido, correo: correo, telefono: telefono, rol: rol, secret: secret };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { autoCommit: true });
        await connection.close();

        if (result.rowsAffected && result.rowsAffected == 1) {
            res.status(200).json({ message: 'Se guardó el usuario', nombre: nombre, secret: secret });
        } else {
            res.status(400).json({ message: 'No se guardó el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getUsuario,
    getUsuarioNombre,
    createUsuario,
    getUsuarioLogin,
    verifyLogin
}