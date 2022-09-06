const { Pool } = require('pg') // ? Importamos módulo pg
const { db } = require('./config') // ? Importamos configuración de la base de datos');

const pool = new Pool({
  // * Creamos una nueva conexión a la base de datos
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database
})

module.exports = pool // ? Exportamos la conexión a la base de datos
