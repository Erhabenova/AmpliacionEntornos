require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'isidoronm',
  password: process.env.DB_PASSWORD || 'mm123',
  database: process.env.DB_DATABASE || 'concesionario_msr',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;