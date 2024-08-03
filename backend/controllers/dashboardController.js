const oracledb = require('oracledb');
const dbConfig = require('../database'); 

async function topVideojuegosCantidadVentas(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT nombre_videojuego_plataforma AS videojuego, SUM(cantidad_vendida) AS cantidad  FROM vista_venta_detalle GROUP BY nombre_videojuego_plataforma ORDER BY cantidad DESC) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'VIDEOJUEGO', 'CANTIDAD');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function topVideojuegosRecaudacion(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT nombre_videojuego_plataforma AS videojuego, ROUND(SUM(cantidad_vendida*precio),2) AS recaudacion  FROM vista_venta_detalle GROUP BY nombre_videojuego_plataforma ORDER BY recaudacion DESC) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'VIDEOJUEGO', 'RECAUDACION');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function topGenerosCantidadVentas(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT vista_videojuego.generos as genero, SUM(cantidad_vendida) AS cantidad  FROM vista_venta_detalle INNER JOIN vista_videojuego on vista_videojuego.id_videojuego_plataforma= vista_venta_detalle.id_videojuego_plataforma GROUP BY vista_videojuego.generos  ORDER BY cantidad DESC  ) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'GENERO', 'CANTIDAD');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function topGenerosRecaudacion(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT vista_videojuego.generos as genero, ROUND(SUM(vista_venta_detalle.cantidad_vendida*vista_venta_detalle.precio),2) AS recaudacion FROM vista_venta_detalle  INNER JOIN vista_videojuego on vista_videojuego.id_videojuego_plataforma= vista_venta_detalle.id_videojuego_plataforma GROUP BY vista_videojuego.generos  ORDER BY recaudacion DESC  ) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'GENERO', 'RECAUDACION');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function topPlataformasCantidadVentas(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT vista_videojuego.nombre_plataforma as plataforma, SUM(cantidad_vendida) AS cantidad  FROM vista_venta_detalle INNER JOIN vista_videojuego on vista_videojuego.id_videojuego_plataforma= vista_venta_detalle.id_videojuego_plataforma GROUP BY vista_videojuego.nombre_plataforma  ORDER BY plataforma DESC  ) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'PLATAFORMA', 'CANTIDAD');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function topPlataformasRecaudacion(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT vista_videojuego.nombre_plataforma as plataforma, ROUND(SUM(vista_venta_detalle.cantidad_vendida*vista_venta_detalle.precio),2) AS recaudacion FROM vista_venta_detalle INNER JOIN vista_videojuego on vista_videojuego.id_videojuego_plataforma= vista_venta_detalle.id_videojuego_plataforma GROUP BY vista_videojuego.nombre_plataforma  ORDER BY recaudacion DESC  ) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'PLATAFORMA', 'RECAUDACION');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function cantidadPedidosProveedor(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT vista_pedido.nombre_proveedor as proveedor, SUM(cantidad) AS cantidad  FROM vista_pedido  GROUP BY vista_pedido.nombre_proveedor ORDER BY cantidad DESC  ) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'PROVEEDOR', 'CANTIDAD');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function recaudacionPedidosProveedor(req, res) {
    try {
        // Conectar a Oracle utilizando la configuración exportada
        const connection = await oracledb.getConnection(dbConfig);
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM (SELECT vista_pedido.nombre_proveedor as proveedor, SUM(total) AS total  FROM vista_pedido  GROUP BY vista_pedido.nombre_proveedor ORDER BY total DESC  ) WHERE ROWNUM <= 5', [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.row);
        // Liberar la conexión
        await connection.close();
        let resultado=filtroClaveValor(result.rows, 'PROVEEDOR', 'TOTAL');
        // Enviar el resultado como respuesta JSON
        res.json(resultado);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

function filtroClaveValor(arreglo,clave,valor){
    let elemento_result={};
    for(let elemento of arreglo){
        elemento_result[`${elemento[clave]}`]= elemento[valor];
    }
    return elemento_result;
}

module.exports={
    topVideojuegosCantidadVentas,
    topVideojuegosRecaudacion,
    topGenerosCantidadVentas,
    topGenerosRecaudacion,
    topPlataformasCantidadVentas,
    topPlataformasRecaudacion,
    cantidadPedidosProveedor,
    recaudacionPedidosProveedor
}