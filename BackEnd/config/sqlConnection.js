const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: '18.236.203.31',
    database: 'handshake_application_db',
    user: 'root',
    password: 'root'
});


try {
    console.log('Trying to establish database connection...');
    dbConnection.connect();
    console.log('Connection Established!')
} catch (error) {
    console.log('Connection could not be established:' + error);
}

module.exports = dbConnection;