const oracledb = require('oracledb');
const dbConfig = require('../database'); 

async function getVideojuegos(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM vista_videojuego ORDER BY TITULO', [],
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

async function getVideojuegosRecientes(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM vista_videojuego ORDER BY fecha_creacion_videojuego FETCH FIRST 10 ROWS ONLY', [],
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


async function getVideojuego(req, res){
    const {id}=req.params;
    const query= 'SELECT * FROM vista_videojuego where id_videojuego_plataforma=:id'
    const values= {id:id};

    try{
        const connection= await oracledb.getConnection(dbConfig);
        const result= await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length>0){
            mapearImagen(result.rows[0]);
            res.json(result.rows);
        }else{
            res.status(500).json({ message: 'No existe el videojuego' });
        }

    }catch(err){
        res.status(500).json({ error: "Error en el servidor" });

    }
}

function mapearImagenes(videojuegos){
    videojuegos.map(videojuego=> {
        if(videojuego.IMAGEN){
            videojuego.IMAGEN= videojuego.IMAGEN.split('\n');
        }
        });
}

function mapearImagen(videojuego){
    if(videojuego.IMAGEN){
        videojuego.IMAGEN= videojuego.IMAGEN.split('\n');
    }
}

module.exports={
getVideojuegos,
getVideojuego,
getVideojuegosRecientes
};