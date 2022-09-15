const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function startup() {
  console.log('Iniciando Motores');

  try {
    console.log('Iniciando Base de datos');

    await database.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); 
  }

  try {
    console.log('Iniciando api');

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

startup();

async function shutdown(e) {
  let err = e;

  console.log('Apagando Motores');

  try {
    console.log('Cerrando api');

    await webServer.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  try {
    console.log('Cerrar Base de datos');

    await database.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  console.log('Salida del proceso');

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

process.once('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err);
});


