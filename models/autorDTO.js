//dto del autor
function getAutorFromRec(req) {
    const autor = {
      id_a: req.body.id_a,
        nombre: req.body.nombre,
        nacimiento: req.body.nacimiento,
        procedencia: req.body.procedencia,
        correo: req.body.correo,
    };
  
    return autor;
  }

  module.exports.dto = getAutorFromRec;