const libros = require('../db/libros.js');
const libroDTO= require('../models/libroDTO.js');

//funcion que maneja la transaccion de obtener todos los libros, entre la base de datos y el servidor

async function getAll(req, res) {
  try {
    const rows = await libros.find();
    
    res.status(200).json(rows);
    

  } catch (err) {
    console.log(err+"No se puedo buscar todos los libros");
  }
}

module.exports.get = getAll;


//funcion que maneja la transaccion de obtener un libro entre la base de datos y el servidor

async function getOne(req, res) {
  try { 
    const id = req.params.id;
    const rows = await libros.findOne(id);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err+"No se puedo buscar el libro");
  }
}

module.exports.getOne = getOne;

//funcion que maneja la transaccion de agregar un libro, entre la base de datos y el servidor
async function post(req, res, next) {

  try {
    let libro = libroDTO.dto(req);
    
    libro = await libros.create(libro);

    res.status(201).json(libro);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

//funcion que maneja la transaccion de eliminar un libro, entre la base de datos y el servidor

async function del(req, res) {
  try { 
    const id = req.params.id;
    const rows = await libros.delete(id);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err+"No se puede eliminar el libro");
  }
}

module.exports.delete = del;
