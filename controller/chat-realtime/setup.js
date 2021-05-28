module.exports = (session, io) => {
    sharedsession = require("express-socket.io-session");
    // authentication middlerware
    io.use(sharedsession(session))
    io.use((socket, next) => {
        if(socket.handshake.session.passport.user)
        {
           next();
        }
        else {
            socket.emit('todolist.redirect', '/login');
        }
    })
    // hadling connection message
    io.on('connection', socket => {
        // console.log(socket.handshake)
    })
}
