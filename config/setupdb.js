const db = require('./key');
module.exports = () => {
    let mysql = require('mysql');
    let connect = mysql.createConnection(db);
    let sql =  `create table if not exists user (
        id bigint primary key not null primary key auto_increment,
        username varchar(50),
        password varchar(50)
    );`;
    connect.query(sql, (err, result, info) => {
        connect.end();
        if(err) {
            let newerr = new Error('Setup database: failed');
            throw newerr;
        }
        console.log('setup database: success');
        return;
    })
}