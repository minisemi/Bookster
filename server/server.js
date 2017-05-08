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

app.get(`/api/companies/:id1`, (req,res)=> {
    connection.query('select * from companies where id = ?', [req.params.id1], function (err, rows){
        let companies = JSON.parse(JSON.stringify(rows))[0];

        res.json(companies);
    })
})

app.get('/api/booking/current', (req, res) => {
    connection.query('select * from facilities', function(err, rows){

        let current = JSON.parse(JSON.stringify(rows));

        res.json(current);
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


app.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect : '/special', // redirect to the secure profile section
		failureRedirect : '/hej' // redirect back to the signup page if there is an error
}));

app.listen(3333);
console.log('Listening on localhost:3333');

