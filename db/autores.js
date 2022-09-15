const oracledb = require('oracledb');
const database = require('../services/database.js');

//function para encontrar todos los autores

const findQuery =

 `select id_a "id",
    nombre "nombre",
    nacimiento "naciemiento",
    procedencia "procedencia",
    correo "correo" from autores`;

async function findAll() {
  let query = findQuery;
  const result = await database.simpleExecute(query);

  return result.rows;
}

module.exports.find = findAll;

//funcion de encontrar 1 autor y sus libros recibe el id del autor y devuelve el autor y sus libros
async function findOne(id) {
  let consultaAutor = `select id_a "id",
  nombre "nombre",
  nacimiento "naciemiento",
  procedencia "procedencia",
  correo "correo",id_l "id_l",titulo "titulo",anio "anio", genero "genero",paginas "paginas" from autores inner join libros on autores.id_a=libros.fk_a where autores.id_a =`;
  consultaAutor+=""+id;
  const result = await database.simpleExecute(consultaAutor);

  return result.rows;
}

module.exports.findOne = findOne;


//funcion de crear un autor recibe un objeto autor y lo crea en la base de datos

const createSql = 
`insert into autores (
  id_a,
  nombre,
  nacimiento,
  procedencia,
  correo
) values (
  :id_a,
  :nombre,
  :nacimiento,
  :procedencia,
  :correo
)`;


async function create(emp) {
  const autor = Object.assign({}, emp);

  const result = await database.simpleExecute(createSql,autor,{ autoCommit: true });

  return autor;
}

module.exports.create = create;

//funcion de eliminar un autor recibe el id del autor y lo elimina de la base de datos

const eliminarAutor =
 `begin

    delete from autores where id_a=:id_a;
    delete from libros where fk_a=:id_a;

  end;`;

async function del(id) {
  const binds = {
    id_a: id
  };
  const result = await database.simpleExecute(eliminarAutor, binds, { autoCommit: true });
}

module.exports.delete = del;
