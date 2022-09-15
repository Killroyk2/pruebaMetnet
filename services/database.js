require('dotenv').config()
const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');


//funcion que inicializa la base de datos y crea el pool de conexiones

async function initialize() {
  //Se crea el pool de conexiones usando variables de entorno
  await oracledb.createPool({
    user:process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DBC,
  });
  console.log(oracledb.getConnection());
}

module.exports.initialize = initialize;


//Cierre de la base de datos
async function close() {
  await oracledb.getPool().close(0);
}

module.exports.close = close;

//funcion que ejecuta una consulta y devuelve el resultado

async function simpleExecute(statement, binds = [], opts = {}) {
  let conn;
  let result = [];

  opts.outFormat = oracledb.OBJECT;

  try {
    conn = await oracledb.getConnection();
    result = await conn.execute(statement, binds, opts);
    return (result);
  } catch (err) {
    console.error(err);
    throw (err);
  } finally {
    if (conn) { // conn assignment worked, need to close
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports.simpleExecute = simpleExecute;