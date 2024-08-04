const oracledb = require('oracledb');
const dbConfig = require('../database');
const { encrypt } = require("../helpers/handleBcrypt");
const { compare } = require("../helpers/handleBcrypt");


async function getCliente(req, res) {
    console.log("Buscando cliente...");
    const { id } = req.params;
    const query = 'SELECT * FROM cliente where id_cliente=:id'
    const values = { id: id };
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el cliente segun el ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor 1" });

    }
}

async function getClienteNombre(req, res) {
    const { nombre } = req.params;
    const query = 'SELECT * FROM cliente where nombre=:nombre'
    const values = { nombre: nombre };
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el cliente segun el nombre' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor de nombre" });

    }
}

async function getClienteLogin(req, res) {
    console.log("Buscando cliente...");
    const { correo, contrasenia } = req.body;
    console.log("contrasenia: " + contrasenia + " correo: " + correo);
    const query = 'SELECT * FROM cliente where correo=:correo'
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
                res.status(200).json({ succes: true, message: 'Login exitoso', id_cliente: user.ID_CLIENTE, nombre: user.NOMBRE });
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

async function createCliente(req, res) {
    console.log("Creando cliente...");
    const { id_ciudad, cedula, nombre, apellido, fecha_nacimiento, telefono, correo, contrasenia } = req.body;
    const passwordHash = await encrypt(contrasenia);

    // Convertir la fecha de nacimiento al formato esperado por Oracle (DD-MM-YYYY)
    const formattedFechaNacimiento = new Date(fecha_nacimiento).toISOString().split('T')[0];

    const query = `
        INSERT INTO CLIENTE (
            ID_CIUDAD, 
            CEDULA, 
            NOMBRE, 
            APELLIDO, 
            FECHA_NACIMIENTO, 
            TELEFONO, 
            CORREO, 
            CONTRASENIA
        ) VALUES (
            :id_ciudad, 
            :cedula, 
            :nombre, 
            :apellido, 
            TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'), 
            :telefono, 
            :correo, 
            :contrasenia
        )
    `;

    const values = {
        id_ciudad: id_ciudad,
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        fecha_nacimiento: formattedFechaNacimiento,
        telefono: telefono,
        correo: correo,
        contrasenia: passwordHash
    };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { autoCommit: true });
        await connection.close();

        if (result.rowsAffected && result.rowsAffected == 1) {
            res.status(200).json({ message: 'Se guardó el cliente', nombre: nombre });
        } else {
            res.status(400).json({ message: 'No se guardó el usuario' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor" });
    }
}


module.exports = {
    getCliente,
    getClienteNombre,
    createCliente,
    getClienteLogin,
    verifyLogin
}