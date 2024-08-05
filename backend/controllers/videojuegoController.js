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



async function getVideojuegosNormal(req, res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM VIDEOJUEGO', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function getVideojuegoNormal(req, res) {
    const { id } = req.params;

    // Validar y convertir el parámetro id a número
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
        res.status(400).json({ error: 'ID must be a valid number' });
        return;
    }

    const query = `SELECT ID_VIDEOJUEGO, ID_DESARROLLADORA, TITULO, DESCRIPCION, FECHA_CREACION, ESTADO 
                   FROM VIDEOJUEGO 
                   WHERE ID_VIDEOJUEGO = :id`;
    const binds = { id: idNum };  // Usar el id convertido a número

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Videojuego not found' });
        }
    } catch (err) {
        console.error('Error in getVideojuegoNormal:', err);
        res.status(500).json({ error: 'Server error' });
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

async function addVideojuego(req, res) {
    const { id_desarrolladora, titulo, descripcion, fecha_creacion, estado } = req.body;
    const query = `INSERT INTO videojuego (id_desarrolladora, titulo, descripcion, fecha_creacion, estado) 
                   VALUES (:id_desarrolladora, :titulo, :descripcion, TO_TIMESTAMP(:fecha_creacion, 'DD-MON-RR HH.MI.SS.FF PM'), :estado)`;
    const binds = { id_desarrolladora, titulo, descripcion, fecha_creacion, estado };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, binds, { autoCommit: true });
        await connection.close();

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(201).json({ message: 'Videojuego added successfully' });
        } else {
            res.status(400).json({ message: 'Failed to add videojuego' });
        }
    } catch (err) {
        console.error('Error in addVideojuego:', err);
        res.status(500).json({ error: 'Server error' });
    }
}



async function updateVideojuego(req, res) {
    const { id } = req.params;
    const { id_desarrolladora, titulo, descripcion, fecha_creacion, estado } = req.body;
    const query = `UPDATE videojuego 
                   SET id_desarrolladora = :id_desarrolladora, 
                       titulo = :titulo, 
                       descripcion = :descripcion, 
                       fecha_creacion = TO_TIMESTAMP(:fecha_creacion, 'DD-MON-RR HH.MI.SS.FF PM'),
                       estado = :estado 
                   WHERE id_videojuego = :id`;
    const binds = { id, id_desarrolladora, titulo, descripcion, fecha_creacion, estado };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, binds, { autoCommit: true });
        await connection.close();

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(200).json({ message: 'Videojuego updated successfully' });
        } else {
            res.status(404).json({ message: 'Videojuego not found' });
        }
    } catch (err) {
        console.error('Error in updateVideojuego:', err);
        res.status(500).json({ error: 'Server error' });
    }
}


// Add these to your module.exports
module.exports = {
    getVideojuegos,
    getVideojuegoNormal,
    getVideojuegosNormal,
    getVideojuego,
    getVideojuegosRecientes,
    addVideojuego,
    updateVideojuego
};
