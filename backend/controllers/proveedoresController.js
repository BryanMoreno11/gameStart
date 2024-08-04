const oracledb = require('oracledb');
const dbConfig = require('../database');

// Obtener todos los proveedores
async function getProveedores(req, res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM PROVEEDOR', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Insertar un nuevo proveedor
async function addProveedor(req, res) {
    const { id_ciudad, nombre, celular, correo, direccion, estado } = req.body;
    console.log('Datos recibidos para insertar:', req.body);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO PROVEEDOR (ID_CIUDAD, NOMBRE, CELULAR, CORREO, DIRECCION, ESTADO)
             VALUES (:id_ciudad, :nombre, :celular, :correo, :direccion, :estado)
             RETURNING ID_PROVEEDOR INTO :id`,
            {
                id_ciudad,
                nombre,
                celular,
                correo,
                direccion,
                estado,
                id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_proveedor: result.outBinds.id[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Modificar un proveedor existente
async function updateProveedor(req, res) {
    const { id } = req.params;
    const { id_ciudad, nombre, celular, correo, direccion, estado } = req.body;
    console.log('Datos recibidos para actualizar:', req.body);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE PROVEEDOR
             SET ID_CIUDAD = :id_ciudad,
                 NOMBRE = :nombre,
                 CELULAR = :celular,
                 CORREO = :correo,
                 DIRECCION = :direccion,
                 ESTADO = :estado
             WHERE ID_PROVEEDOR = :id
             RETURNING ID_PROVEEDOR INTO :updatedId`,
            {
                id_ciudad,
                nombre,
                celular,
                correo,
                direccion,
                estado,
                id,
                updatedId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_proveedor: result.outBinds.updatedId[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    getProveedores,
    addProveedor,
    updateProveedor
};
