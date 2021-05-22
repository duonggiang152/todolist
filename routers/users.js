// setup dependences
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')
const {ensureAuthenticated} = require('../config/auth');
const To_Do_List_Model = require('../models/todolist')
router.get('/login',  (req, res) => {
   res.render('signin-out/body', {
       layout: 'signin-out/layout-signinout',
       tittle: 'Đăng nhập',
       messages: res.locals.messages,
       msg_errors: res.locals.msg_errors,
       msg_sucess: res.locals.msg_success
    }
   )
});
router.post('/register', (req, res) => {
    let {user, password, password2} = req.body;
    if(password != password2 ) {
        req.flash('messages', '2 mật khẩu không trùng nhau');
        res.redirect('/users/login');
        return;
    }
    // check user length
    if(user.length >= 25) {
        req.flash('messages', 'tài khoản quá dài');
        res.redirect('/users/login');
        return;
    }
    // check kí tự đặc biệt 
    for(let i = 0 ;i < user.length; i++) {
        let element = user[i];
        if( element != ' ' && element != ',' &&
            element != "'" && element != "`" &&
            element !='"' && element != ';' &&
            element !=':' && element != '/' &&
            element != '\\') {
            }
        else {
            req.flash('messages', 'tài khoản chưa kí tự đặc biệt');
            res.redirect('/users/login');
            return;
        }
    }
    // check passwork length
    if(password.length >=25) {
        req.flash('messages', 'mật khẩu quá dài');
        res.redirect('/users/login');
        return;
    }
    // check ki tu dac biet
    for(let i = 0 ;i <  password.length; i++) {
        let element = password[i];
        if( element != ' ' && element != ',' &&
            element != "'" && element != "`" &&
            element !='"' && element != ';' &&
            element !=':' && element != '/' &&
            element != '\\') {
  
            }
        else {
            req.flash('messages', 'tài khoản chưa kí tự đặc biệt');
            res.redirect('/users/login');
            return;
        }
    }
    let m_user = new User(user, password);
    User.findOne(m_user)
        .then(result => {
            if(result === null) {
                User.Add(m_user)
                    .then(result => {
                        if(result === true) {
                            req.flash('messages', 'đăng kí thành công');
                            res.redirect('/users/login');
                        } else {
                            req.flash('messages', 'đăng kí thất bại vui lòng chọn tài khoản hoặc mật khẩu khác');
                            res.redirect('/users/login');
                        }

                    })
            } else {
                req.flash('messages', 'tài khoản đã tồn tại vui lòng đăng kí tài khoản khác');
                res.redirect('/users/login');
            }
        })
})
router.post('/login', (req, res, next) => {
   passport.authenticate('local' , (err, user, info) => {
       if(!user) {
           return res.send('404');
       } else {
           req.logIn(user, (err) => {
               return res.redirect('/todolist/');
           })
       }
   })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('messages', 'You are longout');
    res.redirect('/users/login');
})

module.exports = router;