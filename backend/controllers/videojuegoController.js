const oracledb = require('oracledb');
const dbConfig = require('../database'); 

async function getVideojuegos(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM vista_videojuego', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        // Liberar la conexión
        await connection.close();
        mapearImagenes(result.rows);
        // Enviar el resultado como respuesta JSON
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

function mapearImagenes(videojuegos){
    videojuegos.map(videojuego=> {
        if(videojuego.IMAGEN){
            videojuego.IMAGEN= videojuego.IMAGEN.split('\n');
        }
        });
}

module.exports={
getVideojuegos
};