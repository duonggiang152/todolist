const { json } = require('express');
const express = require('express');
const { Strategy } = require('passport');
const router = express.Router();
const passport = require('passport')
const {ensureAuthenticated} = require('../config/auth');
const To_Do_List_Model = require('../models/todolist')
router.get('/', ensureAuthenticated ,(req, res) => {
    // get 10 task 
  
    res.render('todolist/body', {
        layout: 'todolist/layout-todolist',
        messages: req.user.User
    })
      
})
router.post('/gettask', ensureAuthenticated, (req, res) => {
    let {start, end} = req.body;
    let data = new To_Do_List_Model(req.user.User)
    data.get_dynamic_data_in_day(1,10)
        .then(result => {
            let obj = [];
            result.forEach(element => {      
                 let json = {};
                 json.date    = element.date;
                 json.time    = element.time;
                 json.content = element.content;
                 json.isDone  = element.isDone; 
                 obj.push(json);
            });
            res.send(obj)
            })
})
router.post('/add',ensureAuthenticated, (req,res) => {
    let user = req.user.User;
    let task = new To_Do_List_Model(user);
    console.log(req.body);
    console.log(req.body.task_content);
    task.add(req.body.task_content,(err) => {
        console.log(err.messages)
    });
    res.send('successed sending data')
})
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('messages', 'You are longout');
    res.redirect('/users/login');
})
router.post('/test', (req, res) => {
    console.log(req.header)
    console.log(req.body);
    res.send('i resive it');
})
module.exports = router;