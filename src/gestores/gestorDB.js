// gestores/gestorDB.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',          // Host de MySQL
  user: process.env.DB_USER || 'root',       // Usuario MySQL
  password: process.env.DB_PASSWORD || 'mysql_123',  // Contraseña
  database: process.env.DB_DATABASE || 'concesionario_msr',     // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;