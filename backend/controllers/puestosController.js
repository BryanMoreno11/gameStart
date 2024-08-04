const oracledb = require('oracledb');
const dbConfig = require('../database');

async function getPuestos(req, res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM PUESTO', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    getPuestos
};
