const oracledb = require('oracledb');
const dbConfig = require('../database');

// Obtener todos los videojuego_plataforma
async function getVideojuegoPlataformas(req, res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM VIDEOJUEGO_PLATAFORMA', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Insertar un nuevo videojuego_plataforma
async function addVideojuegoPlataforma(req, res) {
    const { id_videojuego, id_plataforma, estado, imagen, precio, descuento } = req.body;
    console.log('Datos recibidos para insertar:', req.body);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO VIDEOJUEGO_PLATAFORMA (ID_VIDEOJUEGO, ID_PLATAFORMA, ESTADO, IMAGEN, PRECIO, DESCUENTO)
             VALUES (:id_videojuego, :id_plataforma, :estado, :imagen, :precio, :descuento)
             RETURNING ID_VIDEOJUEGO_PLATAFORMA INTO :id`,
            {
                id_videojuego,
                id_plataforma,
                estado,
                imagen,
                precio,
                descuento,
                id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_videojuego_plataforma: result.outBinds.id[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Modificar un videojuego_plataforma existente
async function updateVideojuegoPlataforma(req, res) {
    const { id } = req.params;
    const { id_videojuego, id_plataforma, estado, imagen, precio, descuento } = req.body;
    console.log('Datos recibidos para actualizar:', req.body);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE VIDEOJUEGO_PLATAFORMA
             SET ID_VIDEOJUEGO = :id_videojuego,
                 ID_PLATAFORMA = :id_plataforma,
                 ESTADO = :estado,
                 IMAGEN = :imagen,
                 PRECIO = :precio,
                 DESCUENTO = :descuento
             WHERE ID_VIDEOJUEGO_PLATAFORMA = :id
             RETURNING ID_VIDEOJUEGO_PLATAFORMA INTO :updatedId`,
            {
                id_videojuego,
                id_plataforma,
                estado,
                imagen,
                precio,
                descuento,
                id,
                updatedId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_videojuego_plataforma: result.outBinds.updatedId[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    getVideojuegoPlataformas,
    addVideojuegoPlataforma,
    updateVideojuegoPlataforma
};
