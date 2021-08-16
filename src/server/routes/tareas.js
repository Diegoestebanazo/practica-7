const express = require('express');

const router = express.Router();
const tareasModel = require("../models/tareas");

router.get('/', function (req, res, next){
    tareasModel
    .obtener()
    .then(tareas =>{
        res.render("tareas/ver",{
            tareas: tareas,
        });
    })
    .catch(err => {
        return res.status(500).send("Error obteniendo tarea");
    });
});
router.get('/agregar', function(req, res, next){
    res.render("tareas/agregar");
});

router.post('/insertar', function (req, res, next) {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(500).send("no hay nombre");
    }
    tareasModel
        .insertar(nombre)
        .then(idTareaInsertado => {
            res.redirect("/tareas");
        })
    .catch(err => {
        return res.status(500).send("Error insertando tarea");
    });
});

router.get('/eliminar/:id', function (req, res, next) {
    tareasModel
        .eliminar(req.params.id)
        .then( () => {
            res.redirect("/tareas");
        })
    .catch(err => {
        return res.status(500).send("Error eliminando tarea");
    });
});


router.get('/editar/:id', function (req, res, next) {
    tareasModel
        .obtenerPorId(req.params.id)
        .then(tareas => {
            if(tareas){
                res.render("tareas/editar", {
                    tareas: tareas, 
                });
            } else {
                return res.status(500).send("no existe id");
            }
            
        })
    .catch(err => {
        return res.status(500).send("Error obteniendo tarea");
    });
});


router.post('/actualizar/', function (req, res, next) {
    const { id, nombre } = req.body;
    if (!nombre || !id) {
        return res.status(500).send("no hay datos");
    }
    tareasModel
        .actualizar(id, nombre)
        .then(() => {
            res.redirect("/tareas");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando tarea");
        });
});

module.exports = router;