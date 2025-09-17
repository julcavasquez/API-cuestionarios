//const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise'
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
} from '../config.js'
const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;

// db.connect((err) => {
//   if (err) throw err;
//   console.log('✅ Conectado a MySQL');
// });

