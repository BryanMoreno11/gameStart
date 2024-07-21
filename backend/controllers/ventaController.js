const oracledb = require('oracledb');
const dbConfig = require('../database'); 

async function createVenta(req, res) {
    const { id_cliente, total_venta, subtotal, iva } = req.body;
    const query = 'INSERT INTO VENTA (id_cliente, total_venta, subtotal, iva) VALUES (:id_cliente, :total_venta, :subtotal, :iva) RETURNING id_venta INTO :id_venta';
    const values = {
        id_cliente: id_cliente,
        total_venta: total_venta,
        subtotal: subtotal,
        iva: iva,
        id_venta: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, values, { autoCommit: true });
        await connection.close();

        if (result.rowsAffected && result.rowsAffected === 1) {
            const insertedId = result.outBinds.id_venta[0];
            res.status(200).json({ message: 'Se guardó la venta', id: insertedId });
        } else {
            res.status(400).json({ message: 'No se guardó la venta' });
        }
    } catch (err) {
        console.error("Error en el servidor: ", err);
        res.status(500).json({ error: "Error en el servidor", details: err.message });
    }
}

async function createVentaDetalle (req, res){
    const {id_venta, id_videojuego_plataforma, cantidad_vendida}= req.body;
    const query= 'INSERT INTO VENTA_DETALLE (id_venta, id_videojuego_plataforma, cantidad_vendida) VALUES (:id_venta,:id_videojuego_plataforma,:cantidad_vendida)'
    const values={id_venta:id_venta, 
        id_videojuego_plataforma:id_videojuego_plataforma,
         cantidad_vendida:cantidad_vendida};

    try{
        const connection= await oracledb.getConnection(dbConfig);
        const result= await connection.execute(query, values,{ autoCommit: true });
        console.log(result);
        await connection.close();

        if(result.rowsAffected && result.rowsAffected==1){
            res.status(200).json({ message: 'Se guardó la venta detalle' });
        }
        else{
            res.status(400).json({ message: 'No se guardó la venta detalle' });
        }
    }catch(err){
        res.status(500).json({error:"Error en el servidor"})
    }
}




module.exports = {
    createVenta,
    createVentaDetalle
};