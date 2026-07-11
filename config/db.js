const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQL_USER || process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME || 'uas_store',
  port: process.env.MYSQL_PORT || process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  waitForConnections: true,

  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
