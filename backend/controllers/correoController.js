const pdfMake = require('pdfmake/build/pdfmake'); // Importa pdfmake
const pdfFonts = require('pdfmake/build/vfs_fonts'); // Importa pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const nodeMailer = require('nodemailer');

async function generatePdf(pdfDefinition) {
    return new Promise((resolve, reject) => {
        const pdfDoc = pdfMake.createPdf(pdfDefinition);
        pdfDoc.getBuffer((buffer) => {
            resolve(buffer);
        });
    });
}

async function enviarCorreoPrueba(req, res) {
    console.log('Enviando correo...');
    let body = req.body;
    let pdfDefinition = {
        content: [{
            text: 'Reserva Realizada',
            style: 'header'
        }],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 5] // [left, top, right, bottom]
            }
        }
    };

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hola</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px;">
                <h2 style="color: #333; text-align: center;">Hola</h2>
                <p style="text-align: center;">Este es un mensaje de prueba con un PDF adjunto que dice "Hola".</p>
            </div>
        </body>
        </html>
        `;
    try {
        const pdfBuffer = await generatePdf(pdfDefinition);
        let config = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'gamestartstoreec@gmail.com',
                pass: 'bdcq adgp qcqv lstb',
            }
        });
        const opciones = {
            from: 'GameStart',
            subject: 'Reservacion realizada correctamente',
            to: body.correo,
            text: 'Reservacion de prueba',
            html: htmlContent,
            attachments: [{
                filename: 'reservacion.pdf',
                content: pdfBuffer,
            }]
        }
        config.sendMail(opciones, function(error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: error,
                })
            } else {
                res.json({
                    ok: true,
                    msg: result,
                })
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor del correo" });
    }
}

module.exports = {
    enviarCorreoPrueba
}