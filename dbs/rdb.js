const mysql = require('mysql');

module.exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sdc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
