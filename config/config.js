const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

db.connect((err) => {
    if(err) throw err;
    console.log('DATABASE CONNECTED')
})

module.exports = db