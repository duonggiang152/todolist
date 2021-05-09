const mysql = require('mysql');
const db =  require('../config/key');
var connect = undefined;
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
        return new Promise((res, rej) => {
        connect = mysql.createConnection(db)
        // 'self_todolist' have table or not, if don't have, create it
                const sql = `create table if not exists self_todolist_${this._user} (
                    id bigint not null primary key auto_increment,
                    date DATE,
                    time time,
                    content nvarchar(500),
                    bool isDone default false
                );`;
                connect.query(sql, (err, result, info) => {
                    if(err) {
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
    // thêm task công việc vào 
    add(todo_task,callback) {
            let dateObject = new Date();
            let year_month_date = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
            let hour = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
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
                connect.end();
                console.log(`success message : User(${this._user}) đã thêm 1 task công việc`);
            })
    }
    // xóa task công việc theo id
    remove(id, callback) {
        let sql = `delete from self_todolist_${this.user} where id = '${id}';`;
        connect = mysql.createConnection(db);
        connect.query(sql, (err, result, info) => {
            if(err) {
                connect.end();
                let newerr = new Error('Lỗi không thể xóa công việc');
                callback(newerr);
                return;
            }
            connect.end();
            console.log(`success message : User(${this._user}) đã xóa 1 task công việc`);
        })
    }
    isComplete(id, callback) {
        // is task complete or not
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
    setComplete(id,complete,callback){
        //set complete
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
}
module.exports = To_Do_List_Model;