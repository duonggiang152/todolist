const User = require('../models/User')
module.exports = (passport) => {
    passport.serializeUser(function(m_user, done) {
        return done(null, m_user.User);
    });
    passport.deserializeUser(function(m_user, done) {
         User.findOne(new User(m_user, ""))
             .then((result) => {
                if(result !== null) {
                    return done(null, result);
                } else {
                    return done(null, false);
                }
             })
             .catch(err => {
                return done(err);
             })
    }
    );
}