const conexion = require("../config/conexion")
module.exports={
    async insertar(nombre){
        let resultados = await conexion.query(`insert into tareas
        (nombre)
        values
        ($1)`,[nombre]);
        return resultados;
    },
    async obtener(){
        const resultados = await conexion.query("select id, nombre from tareas");
        return resultados.rows;
    },
    async obtenerPorId(id){
        console.log(id);
        const resultados = await conexion.query(`select id, nombre from tareas where id = $1`,[id]);
        return resultados.rows[0];
    },
    async actualizar(id, nombre){
        const resultados = await conexion.query(`update tareas
        set nombre = $2
        where id = $1`, [id, nombre]);
        return resultados;
    },
    async eliminar(id){
        const resultados = await conexion.query(`delete from tareas
        where id = $1`, [id]);
        return resultados;
    },
}