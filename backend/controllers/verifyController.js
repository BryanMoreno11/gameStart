const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

async function verify(req, res) {
    const { auth_token, secret } = req.body;
    console.log(auth_token + " " + secret);
    try {
        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'ascii',
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
    const secret = speakeasy.generateSecret({
        name: 'GameStart Authentication',
    });

    try {
        const data = await qrcode.toDataURL(secret.otpauth_url);
        res.json({
            qrCode: data,
            secret: secret.ascii
        });
    } catch (err) {
        res.status(500).json({ error: "Error generando el QR" });
    }
}
module.exports = { verify, generateQrCode };