const oracledb = require('oracledb');
const dbConfig = require('../database');

// Obtener todos los empleados
async function getEmpleados(req, res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM EMPLEADO', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Insertar un nuevo empleado
async function addEmpleado(req, res) {
    const { id_sucursal, id_ciudad, id_puesto, cedula, nombre, fecha_nacimiento, direccion, telefono, correo, estado } = req.body;
    console.log('Datos recibidos para insertar:', req.body); // <-- Log para debug
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO EMPLEADO (ID_EMPLEADO, ID_SUCURSAL, ID_CIUDAD, ID_PUESTO, CEDULA, NOMBRE, FECHA_NACIMIENTO, DIRECCION, TELEFONO, CORREO, ESTADO, FECHA_CREACION)
             VALUES (GAME_START.ISEQ$$_73608.nextval, :id_sucursal, :id_ciudad, :id_puesto, :cedula, :nombre, :fecha_nacimiento, :direccion, :telefono, :correo, :estado, SYSDATE)
             RETURNING ID_EMPLEADO INTO :id`,
            {
                id_sucursal,
                id_ciudad,
                id_puesto,
                cedula,
                nombre,
                fecha_nacimiento: new Date(fecha_nacimiento),
                direccion,
                telefono,
                correo,
                estado,
                id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_empleado: result.outBinds.id[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// Modificar un empleado existente
async function updateEmpleado(req, res) {
    const { id } = req.params;
    const { id_sucursal, id_ciudad, id_puesto, cedula, nombre, fecha_nacimiento, direccion, telefono, correo, estado } = req.body;
    console.log('Datos recibidos para actualizar:', req.body); // <-- Log para debug
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE EMPLEADO 
             SET ID_SUCURSAL = :id_sucursal, 
                 ID_CIUDAD = :id_ciudad, 
                 ID_PUESTO = :id_puesto, 
                 CEDULA = :cedula, 
                 NOMBRE = :nombre, 
                 FECHA_NACIMIENTO = :fecha_nacimiento, 
                 DIRECCION = :direccion, 
                 TELEFONO = :telefono, 
                 CORREO = :correo, 
                 ESTADO = :estado 
             WHERE ID_EMPLEADO = :id 
             RETURNING ID_EMPLEADO INTO :updatedId`,
            {
                id_sucursal,
                id_ciudad,
                id_puesto,
                cedula,
                nombre,
                fecha_nacimiento: new Date(fecha_nacimiento),
                direccion,
                telefono,
                correo,
                estado,
                id,
                updatedId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
        );
        await connection.close();
        res.json({ id_empleado: result.outBinds.updatedId[0] });
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    getEmpleados,
    addEmpleado,
    updateEmpleado
};
