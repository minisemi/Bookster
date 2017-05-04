var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var connection = mysql.createConnection(require('./database').connection);

connection.query('USE bookster');

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
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, firstName, familyName, password, birth, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from users where email = ?",[email], function(err,rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUserMysql = new Object();

                    newUserMysql.email    = email;
                    newUserMysql.password = password; // use the generateHash function in our user model

                    var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
                    console.log(insertQuery);
                    connection.query(insertQuery,function(err,rows){
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        }
    ))
}