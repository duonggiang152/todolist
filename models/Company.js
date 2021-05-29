const db = require('../config/key')
const User = require('./User')
const Mysql = require('mysql');
const { json } = require('express');
class Company {
    static CreateCompanyMemberTable = (company_id) => {
        return new Promise(Res => {
        Company.GetCompany(company_id)
                .then(data => {
                    let sql = `create table if not exists company_${data.id}_members (
                        id_company_member bigint primary key not null primary key auto_increment,
                        id_user bigint,
                        position nvarchar(30)
                    );`
                    let connect = Mysql.createConnection(db);
                    connect.query(sql, (err, datas) => {
                        connect.end()
                        if(err) throw err;
                        Res(true);
                    })
                })
        })
    }
    static GetCompany(company_id) {
        return new Promise(Res => {
        let sql = `select * from companies where id = '${company_id}';`;
        let connect = Mysql.createConnection(db);
        connect.query(sql, (err, datas) => {
            connect.end();
            if(err) throw err;
            datas = JSON.stringify(datas);
            datas = JSON.parse(datas);
            Res(datas[0])
        })
        })
    }
    static isCompanyexist(company_name) {
        return new Promise((res, rej) => {
        let sql = `select * from companies where Company_name = '${company_name}'`;
        let connect = Mysql.createConnection(db);
        connect.query(sql, (err, data) => {
            connect.end()
            if(err) throw err;
            if(data.length !== 0) res(true)
            else res(false)
        })
        })
    }
    static ListCompanies(user_id) {
        return User.getUser(user_id)
                    .then(data => {
                        return new Promise((res) =>{
                        let sql = `select * from companies where director = '${data.username}'`;
                        let connect = Mysql.createConnection(db);
                        connect.query(sql, (err, datas) => {
                            connect.end()
                            if(err) throw err;
                            datas = JSON.stringify(datas);
                            datas = JSON.parse(datas);
                            res(datas);    
                        })
                        })
                    })
    }
    static GetCompanybyName(name) {
        return new Promise(res => {
            let sql = `select * from companies where Company_name = '${name}';`;
            let connect = Mysql.createConnection(db);
            connect.query(sql ,(err, datas) => {
                connect.end();
                if(err) throw err;
                datas = JSON.stringify(datas);
                datas = JSON.parse(datas);
                res(datas[0]);    
            })
        })
    }
    static CreateCompany(director_id, company_name) {
        return User.getUser(director_id)
            .then((data) => {
                return new Promise((res, rej ) => {
                Company.isCompanyexist(company_name)
                    .then(result => {
                        if(!result)
                        {   
                            
                           let sql = `  insert into companies(Company_name, director, namespace) 
                                        value('${company_name}', '${data.username}', 'namespace_of_${company_name}');`; 
                            const connect = Mysql.createConnection(db);
                            connect.query(sql, (err) => {
                                connect.end();
                                // create  company_id_table
                                Company.GetCompanybyName(company_name)
                                .then(data_company => {
                                    Company.CreateCompanyMemberTable(data_company.id).then(check => {
                                        User.add_user_company(director_id, company_name, 'director');
                                        console.log(`Created companytable for company ${data_company.Company_name}`);
                                    })
                                    .catch(err => {
                                        console.log(`Can't not create companytable for company ${data_company.Company_name}`)
                                    })
                                })
                                if(err) throw err;
                                console.log(`User ${data.username} create ${company_name}: scucess` );
                                res(true);
                            })
                        }
                        else
                        {
                            res(false)
                        } 
                    })
                })
            })
    }
}
module.exports = Company;
