const db = require('../config/key')
class Company {
    constructor(user) {
        this.user = user;
    }
    ListCompanyJoined() {
        let mysql   = require('mysql')
        let connect = mysql.createConnection(db);
        let sql     = ``
    }
    CreateCompany(name) {
        
    }
  
}