const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('../routes/router.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
let httpServer;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Author Management API',
      version: '1.0.0',
      description:
        'This is a simple CRUD API  application to manage books and authors made with Express and documented with Swagger'
    },
    servers: [
      {
        url: 'http://localhost:3000'

      }
    ],
    
  },
  apis: ["./routes/*.js"]  
};

const specs=swaggerJSDoc(options);

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Parsea el cuerpo de la solicitud y lo convierte en un objeto json
    app.use(express.json({
      reviver: reviveJson
    }));

    // monta api sobre la ruta general por lo que todos los endpoints se montan sobre /api
    app.use('/api', router,swaggerUi.serve,swaggerUi.setup(specs));

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;



function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
//funcion para convertir los valores de las fechas a formato ISO8601
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}
