var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;
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

var configAuth = require('./auth');


module.exports = function (passport){
    passport.serializeUser(function(user, done){
        console.log(user)
        done (null, user)
    })
    passport.deserializeUser(function (email, done) {
        //connection.query("select * from users where email =" + email, function(err, rows){
            //done(err, rows[0])
        done(null,email)
        //})
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
                    return done(null, false, { message: 'User already exists'});
                } else {
                    var firstName = req.body.firstName,
                        surName = req.body.surName,
                        birth = req.body.birth;

                    //If user does not exist, create new

                    var insertQuery = "INSERT INTO users (email, firstName, familyName, password, birth) values (?,?,?,?,?)";

                    connection.query(insertQuery, [email, firstName, surName, password, birth],function(err,rows){


                        return done(null, email, { message: 'Signed up!' });
                    });
                }
            });
        }
    ))

    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },  function(accessToken, refreshToken, profile, cb) {
        console.log("using fb passport!!")
            return cb(null, profile);
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
                    return done (null, false, {message: 'notSignedIn'});
                var payload = {email: rows[0].email};
                var token = jwt.sign(payload, parameters.secretOrKey)
                return done(null, rows[0], {message: 'signedIn', token: token});
            })
        }
        )
    )

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

}