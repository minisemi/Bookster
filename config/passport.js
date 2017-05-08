var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var connection = mysql.createConnection(require('./database').connection);

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
                    console.log('already taken!')
                    return done(null, false);
                } else {
                    firstName = req.body.firstName
                    surName = req.body.surName
                    birth = req.body.birth

                    //If no user exists, create new
                    var newUserMysql = new Object();

                    newUserMysql.email    = email;
                    newUserMysql.password = password; // use the generateHash function in our user model

                    var insertQuery = "INSERT INTO users values (?,?,?,?,?)";

                    connection.query(insertQuery, [email, firstName, surName, password, birth],function(err,rows){
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        }
    ))
}