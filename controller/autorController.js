const autores = require('../db/autores.js');
const autorDTO= require('../models/autorDTO.js');

//funcion que maneja la transaccion de obtener todos los autores, entre la base de datos y el servidor
async function getAll(req, res) {
  try {
    const rows = await autores.find();
    
    res.status(200).json(rows);
    

  } catch (err) {
    console.log(err+"No se puedo buscar todos los autores");
  }
}

module.exports.get = getAll;
//funcion que maneja la transaccion de obtener un autor, entre la base de datos y el servidor
async function getOne(req, res) {
  try { 
    const id = req.params.id;
    const rows = await autores.findOne(id);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err+"No se puedo buscar el autor");
  }
}

module.exports.getOne = getOne;

//funcion que maneja la transaccion de agregar un autor, entre la base de datos y el servidor
async function post(req, res, next) {

  try {
    let autor = autorDTO.dto(req);
    

    autor = await autores.create(autor);

    res.status(201).json(autor);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

//funcion que maneja la transaccion de eliminar un autor, entre la base de datos y el servidor
async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await autores.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;