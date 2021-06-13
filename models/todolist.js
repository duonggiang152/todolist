
const mysql = require('mysql');
const db =  require('../config/key');

class To_Do_List_Model{
    constructor(user) {
        this._user = user;
    }
    // set and get user
    set user(User) {
        this._user = User;
    }
    get user() {
        return this._user;
    }
    // access database
    // this function return an promise in that day as date, time and content
    get_data_in_day() {
        var connect = undefined;
        return new Promise((res, rej) => {
     
        connect = mysql.createConnection(db)
        // 'self_todolist' have table or not, if don't have, create it
                const sql = `create table if not exists self_todolist_${this._user} (
                    id bigint not null primary key auto_increment,
                    date DATE,
                    time time,
                    content nvarchar(500),
                    isDone bool default false
                );`;
                connect.query(sql, (err, result, info) => {
                    if(err) {
                        console.log(err)
                        let newerr = new Error(`Err get_data_in_day: sảy ra lỗi khi tạo(hoặc kiểm tra) self_todolist_${this._user}`);
                        return rej(newerr);
                    } 
                    return res(result);
    
                })
        }) .then((value) => {
            // get data from mysql
            return new Promise((res,rej)=> {
                const sql = `select * from self_todolist_${this._user};`;
                connect.query(sql, (err, result, info) => {
                        if(err) {
                            let newerr = new Error(`Err get_data_in_day: không thể truy cập vào self_todolist_${this._user}`);
                            return rej(newerr);
                        }
                        connect.end();
                        return res(result);
                    })
                })
        })

    }
    get_dynamic_data_in_day(from, to ) {
        var connect = undefined;
        return new Promise((res, rej) => {
     
        connect = mysql.createConnection(db)
        // 'self_todolist' have table or not, if don't have, create it
                const sql = `create table if not exists self_todolist_${this._user} (
                    id bigint not null primary key auto_increment,
                    date DATE,
                    time time,
                    content nvarchar(500),
                    isDone bool default false
                );`;
                connect.query(sql, (err, result, info) => {
                    if(err) {
                        console.log(err)
                        let newerr = new Error(`Err get_data_in_day: sảy ra lỗi khi tạo(hoặc kiểm tra) self_todolist_${this._user}`);
                        return rej(newerr);
                    } 
                    return res(result);
    
                })
        }) .then((value) => {
            // get data from mysql
            return new Promise((res,rej)=> {
                let limit = to - from;
                const sql = `select * from self_todolist_${this._user}
                            order by date desc, time desc
                            limit ${limit} offset ${from};`;
                connect.query(sql, (err, result, info) => {
                        if(err) {
                            let newerr = new Error(`Err get_data_in_day: không thể truy cập vào self_todolist_${this._user}`);
                            return rej(newerr);
                        }
                        connect.end();
                        return res(result);
                    })
                })
        })

    }
    // thêm task công việc vào 
    add(todo_task,callback, dateObject) {
           if(dateObject === undefined) dateObject = new Date();
            var connect = undefined;
            let year_month_date = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
            let hour = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
            console.log(year_month_date)
            connect = mysql.createConnection(db);
            let sql = `insert into self_todolist_${this._user}(date, time, content)
                    value('${year_month_date}', '${hour}',N'${todo_task}')`;
            connect.query(sql, (err, result, info) => {
                if(err) {
                    connect.end();
                    let newerr = new Error('Lỗi không thể thêm công việc');
                    callback(newerr);
                    return;
                    
                }
                let sql2 = `select * from self_todolist_${this._user} order by id desc limit 1`
                connect.query(sql2 , (err, data123) => {
                    connect.end();
                    data123 = JSON.stringify(data123);
                    data123 = JSON.parse(data123);
                   callback(null, data123[0])

                })
                console.log(`success message : User(${this._user}) đã thêm 1 task công việc`);
            })
    }
    // xóa task công việc theo id
    remove(id, callback) {
        var connect = undefined;
        let sql = `delete from self_todolist_${this.user} where id = '${id}';`;
        connect = mysql.createConnection(db);
        connect.query(sql, (err, result, info) => {
            if(err) {
                connect.end();
                let newerr = new Error('Lỗi không thể xóa công việc');
                callback(newerr);
                return;
            }
            callback(false)
            connect.end();
            console.log(`success message : User(${this._user}) đã xóa 1 task công việc`);
        })
    }
    isComplete(id, callback) {
        // is task complete or not
        var connect = undefined;
        connect = mysql.createConnection(db);
        let sql = `select isDone from self_todolist_${this.user} where id = '${id}';`;
        connect.query(sql, (err, result, info) => {
            connect.end();
            if(err) {
                let newerr = new Error('server gặp vấn đề');
                callback(newerr, false);
                return;
            }
            if(result.length === 0) {
                let newerr = new Error('id task không tồn tại');
                callback(newerr, false);
                return;
            }
            callback(null, result[0].isDone);
            return;
        })
    }
    updateconditiontask(id, condition, callback) {
        var connect = undefined;
        let sql = ` update self_todolist_${this.user}
                    set isDone = ${condition}
                    where id = '${id}';`;
        connect = mysql.createConnection(db);
        connect.query(sql, (err, data) => {
            connect.end();
            if(err) {
                console.log("err")
                callback(err);
            }
            callback(false)
        })
    }
    setComplete(id,complete,callback){
        //set complete
        var connect = undefined;
        connect = mysql.createConnection(db);
        let sql = `update self_todolist_${this.user}
                    set isDone = ${complete}
                    where id = ${id};`;
            connect.query(sql, (err, result, info) => {
            connect.end();
            if(err) {
                let newerr = new Error('server gặp vấn đề');
                callback(newerr, false);
                return;
            }
            if(complete)
            console.log(`success message : User(${this._user}) đã hoàn thành 1 công việc`);
            callback(null, result);
            return;
        })
    }
    getDataInDate(date, callback) {
        let sqldate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        let sql = `select * from self_todolist_${this.user}
        where date = '${sqldate}';`;
        let connect = mysql.createConnection(db);
        connect.query(sql, (err, data) => {
            connect.end();
            if(err) callback(err);
            if(!data) {
                console.log('ok')
                callback(null, []);
                return;
            }
            data = JSON.stringify(data);
            data = JSON.parse(data);
            callback(null,data);
        })
    }
    getDataInDateAndCondition(date, condition, callback) {
        let sqldate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        let sql = `select * from self_todolist_${this.user}
        where date = '${sqldate}' and isDone = ${condition} ;`;
        let connect = mysql.createConnection(db);
        connect.query(sql, (err, data) => {
            connect.end();
            if(err) callback(err);
            if(!data) {
                console.log('ok')
                callback(null, []);
                return;
            }
            data = JSON.stringify(data);
            data = JSON.parse(data);
            callback(null,data);
        })
    }
}
module.exports = To_Do_List_Model;
