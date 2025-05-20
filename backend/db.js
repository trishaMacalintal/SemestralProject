const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // add your password if any
  database: 'covid19',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
db.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = db;
