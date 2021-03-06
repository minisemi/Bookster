var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var connection = mysql.createConnection(require('./database').connection);
var passportJWT = require('passport-jwt')
var JWTStrategy = passportJWT.Strategy;
var conf = require('./jwt')
var ExtractJwt = passportJWT.ExtractJwt;
var jwt  = require('jsonwebtoken')
var parameters = {
    secretOrKey: conf.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
}


module.exports = function (passport){
    /* passport.serializeUser(function(user, done){
     done (null, user.email)
     })
     passport.deserializeUser(function (email, done) {
     connection.query("select * from users where email =" + email, function(err, rows){
     done(err, rows[0])
     })
     })*/


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            // check if user exists
            connection.query("select * from users where email = ?",[email], function(err,rows){
                if (err)
                    return done(err);
                else if (rows.length) {
                    return done(null, false, null);
                } else {
                    const firstName = req.body.firstName,
                        familyName = req.body.familyName,
                        birth = req.body.birth;
                    const insertQuery = "INSERT INTO users (email, firstName, familyName, password, birth) values (?,?,?,?,?)";
                    connection.query(insertQuery, [email, firstName, familyName, password, birth],function(err1,rows1){
                        if (err1)
                            return done(err1);
                        const idQuery = "SELECT * FROM users WHERE email = ?";
                        connection.query(idQuery, [email], function (err2,rows2) {
                            if (err2)
                                return done(err2);
                            let payload = { email };
                            let token = jwt.sign(payload, parameters.secretOrKey);
                            return done(null, email, { token: token, user: rows2[0] });
                        })
                    });
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            connection.query('select * from users where email = ?', [email], function (err,  rows){
                if (err)
                    return done(err);
                if (!rows.length || rows[0].password != password)
                    return done (null, false, null);
                let payload = {email: rows[0].email};
                let token = jwt.sign(payload, parameters.secretOrKey)
                return done(null, rows[0], { token: token, user: rows[0]});
            })
        }
        )
    );

    //Function to check if token is valid, only used during development
    passport.use(new JWTStrategy (parameters, function(payload, done) {
            connection.query('select * from users where email = ?', [payload.email], function (err,  rows){
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!rows.length) {
                    done(null, false)
                }
                else {
                    done(null, rows[0]);
                    return payload.email;
                }
            });
        }
    ))

};