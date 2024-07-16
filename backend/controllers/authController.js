const { encrypt } = require("../helpers/handleBcrypt");




const registerCtrl = async(req, res) => {
    try {
        const { nombre, contrasenia, apellido, correo, telefono, rol } = req.body;
        const passwordHash = await encrypt(contrasenia);
    } catch (err) {

    }
}