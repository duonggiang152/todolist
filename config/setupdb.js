const db = require('./key');
module.exports = () => {
    let mysql = require('mysql');
    let connect = mysql.createConnection(db);
    let sql =  `create table if not exists user (
        username varchar(50) primary key,
        password varchar(50)
    );`;
    connect.query(sql, (err, result, info) => {
        connect.end();
        if(err) {
            let newerr = new Error('không thể connect vào db');
            throw newerr;
        }
        console.log('setup success');
        return;
    })
}