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
    passport.serializeUser(function(user, done){
        done (null, user.email)
    })
    passport.deserializeUser(function (email, done) {
        connection.query("select * from users where email =" + email, function(err, rows){
            done(err, rows[0])
        })
    })


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'passw',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            // check if user exists
            connection.query("select * from users where email = ?",[email], function(err,rows){
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, { message: 'user already exists'});
                } else {
                    var firstName = req.body.firstName,
                        surName = req.body.surName,
                        birth = req.body.birth;

                    //If no user exists, create new
                    var newUserMysql = new Object();

                    newUserMysql.email    = email;
                    newUserMysql.password = password; // use the generateHash function in our user model

                    var insertQuery = "INSERT INTO users values (?,?,?,?,?)";

                    connection.query(insertQuery, [email, firstName, surName, password, birth],function(err,rows){
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql, { message: 'Signed up!' });
                    });
                }
            });
        }
    ))

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            connection.query('select * from users where email = ?', [email], function (err,  rows){
                console.log(rows[0])
                if (err)
                    return done(err);
                if (!rows.length || rows[0].password != password)
                    return done (null, false, {message: false});
                var payload = {email: rows[0].email};
                var token = jwt.sign(payload, parameters.secretOrKey)
                return done(null, rows[0], {message: true, token: token});
            })
        }
        )
    )

    passport.use(new JWTStrategy (parameters, function(payload, done) {
            console.log('payload received', payload);
            connection.query('select * from users where email = ?', [payload.email], function (err,  rows){
                console.log(rows[0], "Length: " + rows.length)
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!rows.length) {
                    console.log("not allowed")
                    done(null, false)
                }
                else {
                    console.log("allowed")
                    done(null, rows[0]);
                }
            });
        }
    ))

}