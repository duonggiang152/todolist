const db = require('./key');
const User = require('../models/User')
const setup = () => {
    // stetup user
    // ------------- 
    function usertable() {
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
                let newerr = new Error('Setup user_table: failed');
                throw newerr;
            }
            console.log('setup user_table: success');
            return;
        })
    }
   
    // -----------------
    // setup company
    function companytable() {
        let mysql = require('mysql');
        let connect = mysql.createConnection(db);
        let sql =  `create table if not exists companies (
            id bigint primary key not null primary key auto_increment,
            Company_name nvarchar(50),
            director varchar(50),
            namspace varchar(50)
        );`;
        connect.query(sql, (err, result, info) => {
            connect.end();
            if(err) {
                let newerr = new Error('Setup companies_table: failed');
                throw newerr;
            }
            console.log('setup companies_table: success');
            return;
        })
    }
    async function CreateUserTable() {
       User.list_all_member().then(
            data => {
                let users = data;
                let mysql = require('mysql');
                users.forEach(element => {
                    let connect = mysql.createConnection(db);
                    let sql_create_list_company = `create table if not exists list_company_${element.id} (
                        id bigint primary key not null primary key auto_increment,
                        user varchar(50),
                        company varchar(50),
                        position varchar(30)
                    );`
                    let sql_create_list_message = `create table if not exists list_message_${element.id} (
                        id bigint primary key not null primary key auto_increment,
                        user varchar(50),
                        messages nvarchar(50),
                        type varchar(30)
                    );`
                    connect.query(sql_create_list_company, (err, datas) =>{
                        if(err) 
                        {
                            console.log('setup user table: failed')
                            throw err
                        }
                        connect.query(sql_create_list_message, (err, datas) => {
                            if(err) 
                            {
                                console.log('setup user table: failed')
                                throw err    
                            }
                        
                            connect.end();
                        })
                    })
                });
             
            }
        );
        console.log('Setup user table: scucess')
      
    
    }
    CreateUserTable();
    // init all things
    usertable();
    companytable();
}
module.exports = setup;