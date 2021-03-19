const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'sdc'
});

module.exports.connection.connect((err) => {
  if (err) {
    console.error('error connecting');
    return;
  }
  console.log('connected');
});
