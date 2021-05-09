const mysql = require('mysql');
const db = require('../config/key');
const connect = mysql.createConnection(db);
class User{
    constructor(user, password)
    {
        this._user        = user;
        this._password    = password;
    }
    get Password() {
        return this._password;
    }
    set Password(password) {
        this._paswword = password;
    }
    get User() {
        return this._user;
    }
    set User(user) {
        this._user = user
    }
    static logconnect() {
        connect.connect((err) => {
            if(err) throw err;
            console.log('connect success!!!!');
            connect.end();
        })
    }
    static findOne(user) {
        return new Promise((resolve, reject) => {
                connect.query(`select * from user where username = '${user.User}';`, (err, results, info) => {
                    if(err) 
                    {
                        throw err;
                    }
                    if(results.length) {
                        let dbuser = new User(results[0]['username'], results[0]['password']);
                        resolve(dbuser);
                    } else resolve(null)
                })
        })
        .catch(err => {
            throw err;
        }) 
    }
    static Add(user) {
        return new Promise((resolve, reject) => {
            let sql = `insert into user value('${user.User}', '${user.Password}');`;
            connect.query(sql, (err, results, info) => {
                if(err) {
                    resolve(false);
                    throw err;
                }
                else {
                    resolve(true);
                }
            })
        }) .catch(err => {
            throw err
        });
    }
}
module.exports = User;