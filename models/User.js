
/*
User class
    - constructsure take 2  argument 
        example new User(username, password)
    - findOne(user) return a promise 
*/
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
    static list_all_member() {
        // sql to list all member
        return new Promise((res, rej) => {
            let sql = `select * from user`;
            connect.query(sql, (err, data) => {
                if(err) throw err;
                data = JSON.stringify(data);
                res(JSON.parse(data))
            })
        })
    }
    static getIdOfUser(user) {
        return new Promise((res, rej) => {
        let sql = `select * from user
                    where username = '${user}'`
        connect.query(sql,(err, data) => {
            data = JSON.stringify(data);
            data = JSON.parse(data)
            res(data[0].id)
        })
        })
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
            let sql = `insert into user(username, password) value('${user.User}', '${user.Password}');`;
            connect.query(sql, (err, results, info) => {
                if(err) {
                    resolve(false);
                    throw err;
                }
                else {
                    User.getIdOfUser(user.User).then(id => {
                        let sql_create_list_company = `create table if not exists list_company_${id} (
                            id bigint primary key not null primary key auto_increment,
                            user varchar(50),
                            company varchar(50),
                            position varchar(30)
                        );`;
                        let sql_create_list_message = `create table if not exists list_message_${id} (
                            id bigint primary key not null primary key auto_increment,
                            user varchar(50),
                            messages nvarchar(50),
                            type varchar(30)
                        );`;
                        connect.query(sql_create_list_company, (err, data) =>{
                            if(err) 
                            {
                                console.log(`setup ${user.User} table: failed!`)
                                throw err
                            }
                            connect.query(sql_create_list_message, (err, data) => {
                                if(err) 
                                {
                                    console.log(`setup ${user.User} table: failed!`)
                                    throw err    
                                }
                                console.log(`setup ${user.User} table: scucess!`)
                                connect.end();
                            })
                        })
                    })
                    resolve(true);
                }
            })
        }) .catch(err => {
            throw err
        });
    }
}
module.exports = User;
