module.exports = {
    ensureAuthenticated: (req, res , next) => {
        if(req.isAuthenticated()) {
            next();
        }
        else {
        req.flash('messages', 'please long in to wiew this resource');
        res.redirect('/users/login')
        }
    }
}