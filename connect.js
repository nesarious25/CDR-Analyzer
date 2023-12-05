const mysql = require('mysql2');


// MySQL Database Connection
const connection = mysql.createConnection({
  host: '172.30.217.102',
  user: 'monitor',
  password: 'xflow@123',
  database: 'voipmonitor_alina',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
module.exports = {connection}
