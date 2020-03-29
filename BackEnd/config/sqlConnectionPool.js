const mysql = require('mysql');

const dbConnectionPool = mysql.createPool({
    host: '18.236.203.31',
    database: 'handshake_application_db',
    user: 'root',
    password: 'root',
    connectionLimit: 15
});

dbConnectionPool.getConnection((error, connection) => {
    if (error) {
      if (error.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
      }
      if (error.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
      }
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
    }
    
    if (connection) connection.release();
    return;
  });

module.exports = dbConnectionPool;