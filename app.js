// setup database
require('./config/setupdb')();

// dependences
const express = require('express');
const expressLayouts =  require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
// App setup
const PORT = process.env.PORT || 3000;
const app = express();
// setup iosocket
const http = require('http');
const server = http.createServer(app);
const Server = require('socket.io')
const io     = Server(server)

// setup session for socketio and express
let session = require('express-session');

require('./config/mysql_session')(app, session, io);

// set flash
app.use(flash());

//body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json());
//set publicfolder
app.use(express.static('public'))
require('./config/passport-config')(passport)
//config sesstion




// set passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// set connect-flash
app.use( (req, res, next) => {
    res.locals.messages      = req.flash('messages');
    res.locals.msg_errors    = req.flash('error');
    res.locals.msg_success   = req.flash('success');
    next();
})

// ejs setup
app.set('view engine', 'ejs');
app.use(expressLayouts);

// set public
app.use('/static',express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.redirect('/users/login')
})
app.use('/todolist', require('./routers/todolist'))
app.use('/users', require('./routers/users'));
server.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server started on port: ${PORT}`)
});;