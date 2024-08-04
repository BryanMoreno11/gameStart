const oracledb = require('oracledb');
const dbConfig = require('../database');

// Obtener todos los pedidos
async function getPedidos(req, res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM PEDIDO', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Insertar un nuevo pedido
async function addPedido(req, res) {
    const { id_proveedor, id_videojuego_plataforma, id_sucursal, precio_unitario, cantidad, descuento, total, estado } = req.body;
    console.log('Datos recibidos para insertar:', req.body);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO PEDIDO (ID_PROVEEDOR, ID_VIDEOJUEGO_PLATAFORMA, ID_SUCURSAL, PRECIO_UNITARIO, CANTIDAD, DESCUENTO, TOTAL, ESTADO)
             VALUES (:id_proveedor, :id_videojuego_plataforma, :id_sucursal, :precio_unitario, :cantidad, :descuento, :total, :estado)
             RETURNING ID_PEDIDO INTO :id`,
            {
                id_proveedor,
                id_videojuego_plataforma,
                id_sucursal,
                precio_unitario,
                cantidad,
                descuento,
                total,
                estado,
                id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_pedido: result.outBinds.id[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


// Modificar un pedido existente
async function updatePedido(req, res) {
    const { id } = req.params;
    const { id_proveedor, id_videojuego_plataforma, id_sucursal, precio_unitario, cantidad, descuento, total, estado } = req.body;
    console.log('Datos recibidos para actualizar:', req.body);
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE PEDIDO
             SET ID_PROVEEDOR = :id_proveedor,
                 ID_VIDEOJUEGO_PLATAFORMA = :id_videojuego_plataforma,
                 ID_SUCURSAL = :id_sucursal,
                 PRECIO_UNITARIO = :precio_unitario,
                 CANTIDAD = :cantidad,
                 DESCUENTO = :descuento,
                 TOTAL = :total,
                 ESTADO = :estado
             WHERE ID_PEDIDO = :id
             RETURNING ID_PEDIDO INTO :updatedId`,
            {
                id_proveedor,
                id_videojuego_plataforma,
                id_sucursal,
                precio_unitario,
                cantidad,
                descuento,
                total,
                estado,
                id,
                updatedId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_pedido: result.outBinds.updatedId[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


module.exports = {
    getPedidos,
    addPedido,
    updatePedido
};
