const oracledb = require('oracledb');
const database = require('../services/database.js');

//funcion de encontrar todos los libros en la base de datos

const findQuery =

 `select id_l "id",
    titulo "titulo",
    anio "anio",
    genero "genero",
    paginas "paginas",
    fk_a "fk_a" from libros`;



async function findAll() {
  let query = findQuery;
  const result = await database.simpleExecute(query);

  return result.rows;
}

module.exports.find = findAll;


//funcion que crea un libro y verifica que el autor exista recibe un objeto libro y verifica que el autor exista por medio de la llave foranea

const createSql =
 `insert into libros
  (id_l, titulo, anio, genero, paginas, fk_a) 
  values (:id_l, :titulo, :anio, :genero, :paginas, :fk_a)`;

const checkExistingAuthorSql = `select count(*) as count from autores where id_a =`;

const count='SELECT COUNT(*) "TOTAL" FROM LIBROS WHERE FK_A='


async function create(emp) {
  const libro = Object.assign({}, emp);
 
  const verify = await database.simpleExecute(checkExistingAuthorSql+' '+libro.fk_a);
  const numero = await database.simpleExecute(count+''+libro.fk_a);
  if (verify.rows[0].COUNT === 0) {
    throw new Error('El autor no está registrado');
  }else if(numero.rows[0].TOTAL>=10){
    throw new Error('No es posible registrar el libro, se alcanzó el máximo permitido.”');   
  }
  else{
  const result = await database.simpleExecute(createSql, libro, { autoCommit: true });
  return libro;
}
}

module.exports.create = create;



//funcion de eliminar los libros de un autor
//Recibe el id del autor y elimina todos sus libros

const borrarlibros =

`begin

DELETE FROM libros WHERE fk_a=:fk_a;

  end;`;
async function eliminar(id) {

  const binds = {
    fk_a: id,
  };
  const result = await database.simpleExecute(borrarlibros, binds, { autoCommit: true });

}

module.exports.delete = eliminar;
