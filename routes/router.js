const express = require('express');
const router = new express.Router();
const autores = require('../controller/autorController.js');
const libros = require('../controller/libroController.js');

//Ruta para autores general

router.route('/autores')
  .get(autores.get)
  .post(autores.post)


module.exports = router;

//Ruta para autores por id donde se obtiene un autor por id y se elimina un autor por id
router.route('/autores/:id?')
  .get(autores.getOne)
  .delete(autores.delete);
module.exports = router;


//Ruta para libros general y para agregar un libro segun los requerimientos
router.route('/libros')
  .get(libros.get)
  .post(libros.post)
  

module.exports = router;


//ruta para libros por id donde se elimina un libro por id
router.route('/libros/:id?')
  .delete(libros.delete);

module.exports = router;