const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const User = require('../models/User')
const db = require('./key');
const connect = mysql.createConnection(db);
module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password'
    },
    (user, password, done) => {
       

    let m_user = new User(user, password);
    User.findOne(m_user)
        .then((results) => {
           
            if(results === null) {
                  done(null, false, {message: 'tài khoản không tồn tại'});
                  return;
            } else {
                   
                if(results.Password === m_user.Password) {
                    console.log('hello')
                   return done(null, m_user, {message: `chào ${m_user.User}`});
                } else {
                   return done(null, false, {message: 'Tài khoản không tồn tại hoặc mật khẩu sai'});
                }
            }
        })
       
    }
  ))
};