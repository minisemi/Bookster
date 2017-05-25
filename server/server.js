//KAN BEHÖVA KOLLA PÅ JUDOATHLETES EXEMPEL FÖR SERVER-SIDE ROUTING OM 404 FÅS VID REFRESH AV SIDA

'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
var jwtGen  = require('jsonwebtoken')
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passport = require('passport');
const session = require('express-session');
var flash = require('connect-flash');
var moment = require('moment');
moment().format();

var conf = require('../config/jwt')


const authenticate = jwt({secret : conf.jwtSecret});


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

TODO: "SERVER CRASHES IF SQL SYNTAX IS WRONG. ADD ERROR HANDLERS"
app.get(`/api/companies/:companyAlias`, (req,res)=> {
    connection.query('select companyAlias,name,city,image,cover,info,type from companies where companyAlias = ?', [req.params.companyAlias], function (err, rows){
        let company = JSON.parse(JSON.stringify(rows))[0];

        res.json(company);
    })
})

app.get(`/api/companies/:companyAlias/bookables/:bookableAlias`, (req,res)=> {
    connection.query('select A.bookableAlias, A.name, A.image, A.cover, A.info, A.type, B.companyAlias from bookables as A inner join companies as B on A.company = B.id and A.bookableAlias=?', [req.params.bookableAlias], function (err, rows){
        let booking = JSON.parse(JSON.stringify(rows))[0];

        res.json(booking);
    })

})

TODO: "SE TILL SÅ ATT INGA KAN BOKA SAMMA OBJEKT SAMTIDIGT. DVS IMPLEMENTERA TRANSACTION OSV"
app.post(`/api/companies/:companyAlias/bookables/:bookableAlias/calender/events`, (req,res)=> {
    connection.query('update facilitybookings set bookedBy = ? where ', [req.body.user], function (err, rows){
        let events = JSON.parse(JSON.stringify(rows));
        res.json(events);
    })

})

app.get(`/api/companies/:companyAlias/bookables/:bookableAlias/calender/events`, (req,res)=> {
    connection.query('select * from facilitybookings where bookable = (select id from bookables where bookableAlias=?)', [req.params.bookableAlias], function (err, rows){
        let events = JSON.parse(JSON.stringify(rows));
        res.json(events);
    })

})

app.get('/api/users/:email/current', (req, res) => {

    connection.query('select A.bookableAlias, A.name, A.image, A.cover, A.info, A.type, D.companyAlias from bookables as A inner join facilityBookings as B on A.id = B.bookable and B.bookedBy=(select C.id from users as C where C.email=?) inner join companies as D on D.id=A.company', [req.params.email],function(err, rows){
        let currentBookings = JSON.parse(JSON.stringify(rows));
        res.json(currentBookings);
    });

});

app.get('/api/users/:email/favourites', (req, res) => {
    connection.query('select A.bookableAlias, A.name, A.image, A.cover, A.info, A.type, D.companyAlias from bookables as A inner join favourites as B on A.id = B.bookable and B.user=(select C.id from users as C where C.email=?) inner join companies as D on D.id=A.company', [req.params.email],function(err, rows){

        let current = JSON.parse(JSON.stringify(rows));

        res.json(current);
    })
});

TODO: "ADD TABLE OR SOMETHING WITH RECOMMENDATIONS. CURRENTLY FETCHING FROM FAOURITES"
app.get('/api/users/:email/recommendations', (req, res) => {
    connection.query('select A.bookableAlias, A.name, A.image, A.cover, A.info, A.type, D.companyAlias from bookables as A inner join favourites as B on A.id = B.bookable and B.user=(select C.id from users as C where C.email=?) inner join companies as D on D.id=A.company', [req.params.email],function(err, rows){

        let current = JSON.parse(JSON.stringify(rows));

        res.json(current);
    })
});


app.get('/api/companies/:companyAlias/bookables', (req, res) => {
    connection.query('select A.bookableAlias, A.name, A.image, A.cover, A.info, A.type, B.companyAlias from bookables as A inner join companies as B on A.company = B.id and B.companyAlias=?', [req.params.companyAlias],function(err, rows){

        let companybookables = JSON.parse(JSON.stringify(rows));

        res.json(companybookables);
    })

});

app.get('/api/suggestions', (req, res) => {
    let suggestions = [
        {
            section: 'Bookables',
            suggestions: []
        },
        {
            section: 'Companies',
            suggestions: []
        }
    ];
    connection.query('select companyAlias,name,city,image,cover,info,type from companies', function(err, rows){

        suggestions[1].suggestions=JSON.parse(JSON.stringify(rows));

        connection.query('select A.bookableAlias,A.name,B.companyAlias,A.image,A.cover,A.info,A.type,B.city from bookables as A inner join companies as B on A.company=B.id', function(err, rows2){

            suggestions[0].suggestions=JSON.parse(JSON.stringify(rows2));
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

app.get('/api/get_user',
    passport.authenticate('jwt', { session: false}),
    function(req, res) {
       // let userEmail = req.headers.email,
        let response = res.req.user;
        let user = {email: response.email, firstName:response.firstName, familyName:response.familyName,
            birth: response.birth, address: response.address}

        res.json(user)
    }
)

app.post('/api/update_user', authenticate, function(req, res) {
  connection.query('UPDATE users SET firstName=?, familyName=?, birth=?, address=?, email=? WHERE email=?',
            [req.body.firstName, req.body.familyName,
                req.body.birth, req.body.address, req.body.email, req.user.email], function(err, rows){
      if(err){
          console.log(err)
          res.json({message:"error in database", token:null})
      }
      else {
          if(rows.affectedRows==0)
              res.json({message: "Information could not be updated", token:null})
           var token = jwtGen.sign({email:req.body.email}, conf.jwtSecret)
          res.json({message: "success", token: token})
      }
      }


            );
});

app.post('/auth/change_pw', authenticate, function(req, res) {

  connection.query('UPDATE users SET password=? WHERE email=? AND password=?',
            [req.body.newPassword, req.user.email, req.body.oldPassword], function(err, rows){
      if(err){
          res.json("error in database")
      }
      else
          if(rows.affectedRows==0)
              return res.json("Wrong password")
          res.json("Password successfully changed")
      }


            );
});

/*app.get('/api/update_user',
    passport.authenticate('jwt', { session: false}),
    function(req, res) {
        let info = req.headers.info,
            response = res.req.user;

        connection.query('UPDATE users SET email=?, firstName=?, familyName=?, birth=?, address=?',
            [req.headers.email, req.headers.firstName, req.headers.familyName,
                req.headers.birth, req.headers.address], function(err){
                if (err)
                    res.json(err);
                res.json("success");
            });
        //res.json(user)
    }
)*/


app.use(session({ secret: 'alexluktar' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


TODO: "HASH PASSWORD"
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

