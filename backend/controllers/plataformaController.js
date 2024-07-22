const oracledb = require('oracledb');
const dbConfig = require('../database'); 

async function getPlataformas(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM plataforma', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        // Enviar el resultado como respuesta JSON
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function getPlataformasVideojuegos(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('select DISTINCT plataforma.ID_PLATAFORMA, plataforma.NOMBRE from plataforma inner join videojuego_plataforma ON plataforma.ID_PLATAFORMA= videojuego_plataforma.ID_PLATAFORMA', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        // Enviar el resultado como respuesta JSON
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function getPlataforma(req, res){
    const {id}=req.params;
    const query= 'SELECT * FROM plataforma where id_plataforma=:id'
    const values= {id:id};

    try{
        const connection= await oracledb.getConnection(dbConfig);
        const result= await connection.execute(query, values, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.status(200);
        if (result.rows.length>0){
            res.json(result.rows);
        }else{
            res.status(500).json({ message: 'No existe la plataforma' });
        }

    }catch(err){
        res.status(500).json({ error: "Error en el servidor" });

    }
}

async function createPlataforma (req, res){
    const {nombre, descripcion, estado}= req.body;
    const query= 'INSERT INTO PLATAFORMA (nombre, descripcion, estado) VALUES (:nombre,:descripcion,:estado)'
    const values={nombre:nombre,descripcion: descripcion,estado: estado};

    try{
        const connection= await oracledb.getConnection(dbConfig);
        const result= await connection.execute(query, values,{ autoCommit: true });
        console.log(result);
        await connection.close();

        if(result.rowsAffected && result.rowsAffected==1){
            res.status(200).json({ message: 'Se guardó la plataforma' });
        }
        else{
            res.status(400).json({ message: 'No se guardó la plataforma' });
        }
    }catch(err){
        res.status(500).json({error:"Error en el servidor"})
    }
}

async function updatePlataforma(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;
    const selectQuery = 'SELECT 1 FROM PLATAFORMA WHERE id_plataforma=:id FOR UPDATE';
    const updateQuery = 'UPDATE PLATAFORMA SET nombre=:nombre, descripcion=:descripcion, estado=:estado WHERE id_plataforma=:id';
    const values = { id: id, nombre: nombre, descripcion: descripcion, estado: estado };
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        // Bloquear la fila seleccionada
        await connection.execute(selectQuery, { id: id });
        // Actualizar la fila
        const result = await connection.execute(updateQuery, values, { autoCommit: true });

        if (result.rowsAffected && result.rowsAffected == 1) {
            res.status(200).json({ message: 'Se actualizó la plataforma' });
        } else {
            res.status(400).json({ message: 'No se actualizó la plataforma' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function deletePlataforma(req, res) {
    const { id } = req.params;
    const selectQuery = 'SELECT 1 FROM PLATAFORMA WHERE id_plataforma=:id FOR UPDATE';
    const deleteQuery = 'DELETE FROM PLATAFORMA WHERE id_plataforma=:id';
    const values = { id: id };

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        // Bloquear la fila seleccionada
        await connection.execute(selectQuery, { id: id });
        // Eliminar la fila
        const result = await connection.execute(deleteQuery, values, { autoCommit: true });

        if (result.rowsAffected && result.rowsAffected == 1) {
            res.status(200).json({ message: 'Plataforma eliminada' });
        } else {
            res.status(400).json({ message: 'No existe la plataforma' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = {
    getPlataformas,
    getPlataforma,
    createPlataforma,
    updatePlataforma,
    deletePlataforma,
    getPlataformasVideojuegos
};