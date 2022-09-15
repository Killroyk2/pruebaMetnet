
//dto del libro

function getLibroFromRec(req) {
    const libros = {
        id_l: req.body.id_l,
        titulo: req.body.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        paginas: req.body.paginas,
        fk_a: req.body.fk_a,
    };
  
    return libros;
  }

  module.exports.dto = getLibroFromRec;