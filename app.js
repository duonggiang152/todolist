// setup database
require('./config/setupdb')();

// dependences
const express = require('express');
const expressLayouts =  require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');

// App setup
const PORT = process.env.PORT || 3000;
const app = express();

// set flash
app.use(flash());


//body parser
app.use(express.urlencoded({extended: false}))
//set publicfolder
app.use(express.static('public'))
require('./config/passport-config')(passport)
//config sesstion
require('./config/mysql_session')(app);



app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.sessionID);
    console.log(req.session.passport)
    next();
})


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
// app.set('layout', 'layout/signinout')

// Set Layout
// app.set('layout', './layout')

app.get('/', (req, res) => {
    res.redirect('/users/login')
})
app.use('/users', require('./routers/users'));
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server started on port: ${PORT}`)
});;