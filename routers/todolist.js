/*
    File contain CRUD in todolist page
*/
/*
   self todolist router
   /getask
   /add
   /deletelist/:idtask
   /getlistby/:day/:date/:month/:year
*/

const { json } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport')
const {ensureAuthenticated} = require('../config/auth');
const To_Do_List_Model = require('../models/todolist');
const User = require('../models/User');
const Company = require('../models/Company');
router.get('/', ensureAuthenticated ,(req, res) => {
    // get 10 task 
    res.render('todolist/body', {
        layout: 'todolist/layout-todolist',
        messages: req.user.User
    })
})
router.get('/getcompanyown', ensureAuthenticated, (req, res) => {
    User.getIdOfUser(req.user.User)
        .then(id => {
            Company.ListCompaniesofID(id).then(datas=> {
                res.send(datas)
            })
        })
    
})
router.get('/getcompanyjoined', ensureAuthenticated, (req, res) => {
    User.getIdOfUser(req.user.User)
        .then(id => {
            User.list_all_company_joined(id)
                .then(data => {
                    res.send(data)
                })
        })
})
// todo word add
// -----------------
router.post('/createcompany', ensureAuthenticated, (req, res) => {
    User.getIdOfUser(req.user.User)
        .then(id => {
            let data = req.body;
            res.setHeader('Content-Type', 'application/json');
            if(data && data.company_name) {
                Company.CreateCompany(id,data.company_name)
                        .then(result => {
                            if(!result) {
                                console.log(`Can't create company "${data.company_name}" for ${req.user.User}`);
                                let message = {
                                    "message": "Company_name exist!!!",
                                }
                                return res.send(message)
                            }
                            // else {
                            let json =  {
                                "scucess": `giang has created ${data.company_name}`,
                            }
                            res.send(json)
                            // }
                        })
                        .catch(err => {
                            console.log('Error in routers/todolist.js/post-createcompany');
                            throw err;

                        });
            }
            else {
                let json =  {
                                "err": "post err",
                            }
                res.send(json);
            }
        })
})
// self todolist
router.post('/gettask', ensureAuthenticated, (req, res) => {
    let {start, end} = req.body;
    let data = new To_Do_List_Model(req.user.User)
    data.get_dynamic_data_in_day(0,10)
        .then(result => {
            let obj = [];
            result.forEach(element => {      
                element = JSON.stringify(element);
                element = JSON.parse(element);
                obj.push(element);
            });
            res.send(obj)
            })
})
router.post('/add',ensureAuthenticated, (req,res) => {
    let user = req.user.User;
    let task = new To_Do_List_Model(user);
    console.log(req.body.task_content);
    task.add(req.body.task_content,(err, data) => {
        res.header('Content-Type', 'application/json')
        if(err) {
            json = {
                "err": true
            };
            return res.send(json)
        }
        return res.send(data);
    });
})

router.post('/addbycondition/:date/:month/:year', (req, res) => {
    let date = parseInt(req.params.date);
    let month = parseInt(req.params.month);
    let year = parseInt(req.params.year);
    let dateObj = new Date(year, month, date);
    console.log(dateObj);
    
    let task = new To_Do_List_Model(user);
    task.add(req.body.task_content,(err, data) => {
        res.header('Content-Type', 'application/json')
        if(err) {
            json = {
                "err": true
            };
            return res.send(json)
        }
        return res.send(data);
    }, dateObj);
})

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('messages', 'You are longout');
    res.redirect('/users/login');
})

// CRUD Taslist
router.post('/deletelist/:idtask', ensureAuthenticated, (req, res) => {
    const idtask = req.params.idtask;
    let data = new To_Do_List_Model(req.user.User);
    data.remove(idtask, (err) => {
        if(err) return res.send('404');
        res.send(`${req.user} đã xóa task-list ${idtask}`);
    })
})
router.post('/getlistby/:date/:month/:year/:condition', ensureAuthenticated, (req, res) => {
    let condition = parseInt(req.params.condition);
    let date = parseInt(req.params.date);
    let month = parseInt(req.params.month);
    let year = parseInt(req.params.year);
    let dateObj = new Date(year, month, date);
    let data = new To_Do_List_Model(req.user.User);
    if(condition === 3) {
    data.getDataInDate(dateObj, (err, data) => {
        if(err) return res.send('404');
        return res.send(data);
    })
    }
    if(condition === 0 || condition === 1) {
        data.getDataInDateAndCondition(dateObj, condition, (err, data) => {
            if(err) return res.send('404');
            return res.send(data);
        })
    }
})

// update is done
router.post('/updatecondition/:idtask/:condition', ensureAuthenticated, (req, res) => {
    const idtask    = req.params.idtask;
    let condition = req.params.condition;
    condition = parseInt(condition)
    let data = new To_Do_List_Model(req.user.User);
    data.updateconditiontask(idtask,condition, (err) => {
        if(err) {
            let message = `${req.user.User} get err when update condition in task ${idtask} in self_task_Table`;
            console.log(message)
            return res.send('404')
        };
        let message = `${req.user.User} scucess when update condition in task ${idtask} in self_task_Table`;
        console.log(message)
        res.send('ok');
    })
})
module.exports = router;