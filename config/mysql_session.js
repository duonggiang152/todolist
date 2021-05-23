    const mysql_session_config = (app,session, io) => {
        const MysqlStore = require('express-mysql-session')(session);
        const db = require('./key');
        let sessionStore = new MysqlStore(db);
        const option = {
            clearExpired: true,
            secret: 'secret',
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60
            }
            }
        const Session = session(option)
        app.use(Session)
        require('../controller/chat-realtime/setup')(Session, io);
    }
module.exports = mysql_session_config;;