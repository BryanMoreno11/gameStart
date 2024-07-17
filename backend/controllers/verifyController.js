const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const oracledb = require('oracledb');
const dbConfig = require('../database');

async function verify(req, res) {
    const { auth_token, secret } = req.body;
    console.log(auth_token + " " + secret);
    try {
        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: auth_token
        });
        if (verified) {
            res.json({ verified: true });
        } else {
            res.status(400).json({ verified: false });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function generateQrCode(req, res) {
    const { nombre } = req.query;
    console.log(nombre);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            'SELECT secret FROM usuario WHERE nombre = :nombre', { nombre: nombre }, { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        await connection.close();
        console.log(result.rows[0]);

        if (result.rows.length > 0) {
            const secret = result.rows[0].SECRET;
            const otpauthUrl = speakeasy.otpauthURL({
                secret: secret,
                label: 'GameStart Authentication',
                encoding: 'base32'
            });

            qrcode.toDataURL(otpauthUrl, (err, data) => {
                if (err) {
                    res.status(500).json({ error: "Error al generar el código QR" });
                } else {
                    res.json({ qrCode: data });
                }
            });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
module.exports = { verify, generateQrCode };