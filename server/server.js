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


/*var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'matilda',
 password : 'johan',
 database : 'bookster'
 });

 connection.connect(function(err){
 if(!err) {
 console.log("Database is connected ... \n\n");
 } else {
 console.log("Error connecting database ... \n\n");
 }
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

app.post('/api/companies', (req, res) => {
    connection.query('select * from companies', function(err, rows){
        let companies = JSON.parse(JSON.stringify(rows));

    const escapedValue = req.body.query;
    const regex = new RegExp('\\b' + escapedValue, 'i');
    res.json(companies.filter(suggestion => regex.test(`${suggestion.name} ${suggestion.city}`)));
    })
});

function getSuggestionValue(suggestion) {
    return `${suggestion.company} ${suggestion.city}`;
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

app.use(session({ secret: 'alexluktar' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


app.listen(3333);
console.log('Listening on localhost:3333');
