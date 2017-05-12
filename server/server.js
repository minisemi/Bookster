/**
 * Created by Matilda on 2017-04-11.
 */
'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passport = require('passport');
const session = require('express-session');
var flash = require('connect-flash');
var moment = require('moment');
moment().format();


require('./../config/passport')(passport);
var connection = mysql.createConnection(require('./../config/database').connection)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


/*const authCheck = jwt({
 secret: 'FC_TDGQvIW5oenBn04qOMrCJsTZMs5CbvSFMsw-MiAugv8yDWMC2WqT3af64PiRF',
 audience: 'ZN96W6dVcHVB_nw93rkRMRQt1DNHFAby'
 });*/

app.get("/",function(req,res){
    connection.query('SELECT * from users LIMIT 2', function(err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });
});

app.get(`/api/companies/:id`, (req,res)=> {
    connection.query('select * from companies where id = ?', [req.params.id], function (err, rows){
        let companies = JSON.parse(JSON.stringify(rows))[0];

        res.json(companies);
    })
})

app.get(`/api/companies/:compId/bookings/:bookId`, (req,res)=> {
    connection.query('select * from facilities where id = ? and company = ?', [req.params.bookId, req.params.compId], function (err, rows){
        let companies = JSON.parse(JSON.stringify(rows))[0];

        res.json(companies);
    })

})

app.get('/api/users/:id/current', (req, res) => {

    connection.query('select A.id, A.name, A.company, A.image, A.cover, A.link, A.info from facilities as A inner join currentBookings as B on A.id = B.facility and B.user=?', [req.params.id],function(err, rows){
        let currentBookings = JSON.parse(JSON.stringify(rows));
        res.json(currentBookings);
    });

});

app.get('/api/users/:id/favourites', (req, res) => {
    connection.query('select A.id, A.name, A.company, A.image, A.cover, A.link, A.info from facilities as A inner join favourites as B on A.id = B.facility and B.user=?', [req.params.id],function(err, rows){

        let current = JSON.parse(JSON.stringify(rows));

        res.json(current);
    })
});

TODO: "ADD TABLE OR SOMETHING WITH RECOMMENDATIONS. CURRENTLY FETCHING FROM FAOURITES"
app.get('/api/users/:id/recommendations', (req, res) => {
    connection.query('select A.id, A.name, A.company, A.image, A.cover, A.link, A.info from facilities as A inner join favourites as B on A.id = B.facility and B.user=?', [req.params.id],function(err, rows){

        let current = JSON.parse(JSON.stringify(rows));

        res.json(current);
    })
});

app.get('/api/companies/:id/bookings', (req, res) => {
    console.log(req.params.id);
    connection.query('select * from facilities where company=?', [req.params.id],function(err, rows){

        let companyBookings = JSON.parse(JSON.stringify(rows));

        res.json(companyBookings);
    })
});

app.get('/api/suggestions', (req, res) => {
    let suggestions = [
        {
            section: 'Bookings',
            suggestions: []
        },
        {
            section: 'Companies',
            suggestions: []
        }
    ];
    connection.query('select * from companies', function(err, rows){
        let companies = JSON.parse(JSON.stringify(rows));
        suggestions[1].suggestions=companies;
        connection.query('select * from facilities', function(err, rows2){
            let facilities = JSON.parse(JSON.stringify(rows2));
            suggestions[0].suggestions=facilities;


            const escapedValue = req.query.query;

            const regex = new RegExp('\\b' + escapedValue, 'i');
            res.json(suggestions
                .map(section => {
                    return {
                        section: section.section,
                        suggestions: section.suggestions.filter(suggestion => regex.test(`${suggestion.name} ${suggestion.city}`))
                    };
                })
                .filter(section => section.suggestions.length > 0));
            //res.json(companies.filter(suggestion => regex.test(`${suggestion.name} ${suggestion.city}`)));

        })
    })
});




app.use(session({ secret: 'alexluktar' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());



app.post('/auth/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) { console.log(err)
            return next(err); }
        if (!user) {
            return res.json(info)};
        console.log(info.message)
        return res.json(info);
    })(req, res, next);
});

app.post('/auth/signin', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            console.log("Error: " + err)
            return next(err);
        }
        return res.json(info);
    })(req, res, next);
});

//Data format expected: "JWT reallylongtoken"
app.get('/auth/auth',passport.authenticate('jwt', { session: false}),
    function(req, res) {
        res.json({message: "Success! You can not see this without a token"});
    }
);

app.listen(3333);
console.log('Listening on localhost:3333');

