    const mysql_session_config = (app) => {
        const session = require('express-session');
        const MysqlStore = require('express-mysql-session')(session);
        const db = require('./key');
        let sessionStore = new MysqlStore(db);
        app.use(session({
            clearExpired: true,
            secret: 'secret',
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60
            }
        }))
    }
module.exports = mysql_session_config;;