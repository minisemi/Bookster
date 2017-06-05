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
const path = require('path');
var flash = require('connect-flash');
var moment = require('moment');

moment().format();

var conf = require('../config/jwt')

app.use(express.static(path.join(__dirname, 'assets')));

//JWT function tat decodes tokens of format "Bearer [token]" with specified key
const authenticate = jwt({secret : conf.jwtSecret});


require('./../config/passport')(passport);

var connection = mysql.createConnection(require('./../config/database').connection)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get(`/api/companies/:companyAlias`,authenticate, (req,res)=> {
    connection.query('select companyAlias,name,city,info,type from companies where companyAlias = ?', [req.params.companyAlias], function (err, rows) {
        if (err) {
            res.json("error in database")
        } else {

            let company = JSON.parse(JSON.stringify(rows))[0];
            if (company){
                company["image"] = `http://localhost:3333/companies/profile/${company.companyAlias}.png`
                company["cover"] = `http://localhost:3333/companies/cover/${company.companyAlias}.png`
            }

            res.json(company);
        }
    })
})

app.get(`/api/companies/:companyAlias/bookables/:bookableAlias/:user`,authenticate, (req,res)=> {
    connection.query('select A.bookableAlias, A.name, A.info, A.type, B.companyAlias from bookables as A inner join companies as B on A.company = B.id and A.bookableAlias=? and B.companyAlias=?', [req.params.bookableAlias, req.params.companyAlias], function (err, rows){
        if(err){
            return res.json({success:false, message: "error in database"})
        }
        else {
            var booking = JSON.parse(JSON.stringify(rows))[0];
            if (booking){
                booking["image"] = `http://localhost:3333/bookables/profile/${booking.bookableAlias}.png`
                booking["cover"] = `http://localhost:3333/bookables/cover/${booking.bookableAlias}.png`
                booking["favourite"] = false;
                //Check if user had bookable as favourite already
                connection.query('select * from favourites inner join bookables on bookables.bookableAlias=? and bookables.id=favourites.bookable and favourites.user=?;', [req.params.bookableAlias, req.params.user], function(err, rows2){
                    if(err) {
                        return res.json({success: false, message: "error in database favourites"})
                    }

                    else if(rows2.length>0){
                        booking["favourite"]= true;
                        //res.json(booking)
                    }
                    res.json(booking);
                })
            }else{
                res.json(booking);
            }

        }
    })

})

app.post(`/api/companies/:companyAlias/bookables/:bookableAlias/calender/events/book`,authenticate, (req,res)=> {
    connection.query('select bookedBy from facilitybookings where bookable=(select id from bookables where bookableAlias=?) and start=?', [req.body.bookableAlias, req.body.start], function (err, rows) {

        if (err) {
            return res.json({success: false, message: "error in database"})
        }
        else{
            let bookedBy = JSON.parse(JSON.stringify(rows));
            if (bookedBy[0].bookedBy === null) {

                connection.query('update facilitybookings set bookedBy=(select id from users where email=?) where bookable=(select id from bookables where bookableAlias=?) and start=?', [req.body.user, req.body.bookableAlias, req.body.start], function (err, rows) {

                    if (err) {
                        return res.json({success: false, message: "error in database"})
                    }
                    else
                        return res.json({success: true})
                })
            }else {
                return res.json({success: false, message: "Bookable already booked"})
            }
        }
    })


})

app.post(`/api/companies/:companyAlias/bookables/:bookableAlias/calender/events/unBook`,authenticate, (req,res)=> {
    connection.query('update facilitybookings set bookedBy=? where bookable=(select id from bookables where bookableAlias=?) and start=? and bookedBy=(select id from users where email=?)', [null, req.body.bookableAlias, req.body.start, req.body.user], function (err, rows){
        if(err){
            return res.json({success:false, message: "error in database"})
        }
        return res.json({success:true})
    })

})

app.get(`/api/companies/:companyAlias/bookables/:bookableAlias/calender/events`,authenticate, (req,res)=> {
    connection.query('select A.title,A.allDay,A.start,A.end,A.descr,B.bookableAlias,A.bookedBy from facilitybookings as A inner join bookables as B on A.bookable = B.id and B.bookableAlias=?', [req.params.bookableAlias], function (err, rows){
        if (err) {
            return res.json("error in database")
        }
        let events = JSON.parse(JSON.stringify(rows));
        res.json(events);
    })

})

app.get('/api/users/:email/current',authenticate, (req, res) => {

    connection.query('select A.bookableAlias, A.name, A.info, A.type, D.companyAlias, B.start, B.end from bookables as A inner join facilityBookings as B on A.id = B.bookable and B.bookedBy=(select C.id from users as C where C.email=?) inner join companies as D on D.id=A.company', [req.params.email],function(err, rows){
        if (err)
            return res.json("error in database")
        let currentBookings = JSON.parse(JSON.stringify(rows));
        for (let key in currentBookings){
            currentBookings[key]["image"] = `http://localhost:3333/bookables/profile/${currentBookings[key].bookableAlias}.png`
        }
        res.json(currentBookings);
    });

});

app.get('/api/users/:email/favourites',authenticate, (req, res) => {
    connection.query('select A.bookableAlias, A.name, A.info, A.type, D.companyAlias from bookables as A inner join favourites as B on A.id = B.bookable and B.user=(select C.id from users as C where C.email=?) inner join companies as D on D.id=A.company', [req.params.email],function(err, rows){
        if (err)
            return res.json("error in database")
        let current = JSON.parse(JSON.stringify(rows));
        for (let key in current){
            current[key]["image"] = `http://localhost:3333/bookables/profile/${current[key].bookableAlias}.png`
        }

        res.json(current);
    })
})

TODO: "ADD CHECK OF USER AND REQUESTERS EMAIL"
app.post('/api/addFavourite', authenticate, (req, res)=>{
    connection.query('INSERT IGNORE INTO favourites VALUES (?,(select id from bookables where bookableAlias=? and company=(select id from companies where companyAlias=?)));', [req.body.user, req.body.bookable, req.body.company], function (err, rows){
        if (err)
            return res.json("error in database")
        if (rows.affectedRows===0)
            return res.json({message: "duplicate or unavailable object"})
        return res.json({message:"success"})
    })
})

app.post('/api/deleteFavourite', authenticate, (req, res)=>{
    connection.query('DELETE FROM favourites WHERE user=? AND bookable=(select id from bookables where bookableAlias=? and company=(select id from companies where companyAlias=?));', [req.body.user, req.body.bookable, req.body.company], function(err, rows){
        if (err) {
            console.log(err)
            return res.json({message: "error in database"})
        }
        if (rows.affectedRows===0)
            return res.json({message: "Unavailable object"})
        return res.json({message: "success"})

    })
})

app.get('/api/checkFav/:id/:bookable', authenticate, (res, req)=>{
    connection.query('SELECT * FROM favourites WHERE user=? AND bookable=?', [req.param.id, req.param.bookable], function(err, rows){

    })
})

TODO: "ADD TABLE OR SOMETHING WITH RECOMMENDATIONS. CURRENTLY FETCHING FROM FAOURITES"
app.get('/api/users/:email/recommendations',authenticate, (req, res) => {
    connection.query('select A.bookableAlias, A.name, A.info, A.type, D.companyAlias from bookables as A inner join favourites as B on A.id = B.bookable and B.user=(select C.id from users as C where C.email=?) inner join companies as D on D.id=A.company', [req.params.email],function(err, rows){
        if (err)
            return res.json("error in database")
        let current = JSON.parse(JSON.stringify(rows));
        for (let key in current){
            current[key]["image"] = `http://localhost:3333/bookables/profile/${current[key].bookableAlias}.png`
        }
        res.json(current);
    })
});


app.get('/api/companies/:companyAlias/bookables', authenticate, (req, res) => {
    connection.query('select A.bookableAlias, A.name, A.info, A.type, B.companyAlias from bookables as A inner join companies as B on A.company = B.id and B.companyAlias=?', [req.params.companyAlias],function(err, rows){
        if (err)
            return res.json("error in database")
        let companybookables = JSON.parse(JSON.stringify(rows));
        for (let key in companybookables){
            companybookables[key]["image"] = `http://localhost:3333/bookables/profile/${companybookables[key].bookableAlias}.png`
        }

        res.json(companybookables);
    })

});

app.get('/api/suggestions', authenticate, (req, res) => {
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
    connection.query('select companyAlias,name,city,info,type from companies', function(err, rows){

        if (err)
            return res.json("error in database")

        suggestions[1].suggestions=JSON.parse(JSON.stringify(rows));

        connection.query('select A.bookableAlias,A.name,B.companyAlias,A.info,A.type,B.city from bookables as A inner join companies as B on A.company=B.id', function(err, rows2){

            suggestions[0].suggestions=JSON.parse(JSON.stringify(rows2));
            const escapedValue = req.query.query;
            const regex = new RegExp('\\b' + escapedValue, 'i');

            var response = suggestions
                .map(section => {
                    return {
                        section: section.section,
                        suggestions: section.suggestions.filter(suggestion => regex.test(`${suggestion.name} ${suggestion.city}`))
                    };
                })
                .filter(section => section.suggestions.length > 0);

            for (let key in response) {
                for (let sug in response[key].suggestions){
                    if(response[key].section ==="Bookables")
                        response[key].suggestions[sug]["image"]=`http://localhost:3333/searchResult/${response[key].suggestions[sug].bookableAlias}.png`
                    else
                        response[key].suggestions[sug]["image"]=`http://localhost:3333/searchResult/${response[key].suggestions[sug].companyAlias}.png`
                }
            }
            res.json(response);

        })
    })
});

app.get('/api/get_user',
    passport.authenticate('jwt', { session: false}),
    function(req, res) {
        let response = res.req.user;
        let user = {email: response.email, firstName:response.firstName, familyName:response.familyName,
            birth: response.birth, address: response.address}

        res.json(user)
    }
)

app.post('/api/update_user', authenticate, function(req, res) {
    var sqlQuery ='UPDATE users SET firstName=?, familyName=?, birth=?, address=?, email=? WHERE email=?',
        parameters = [req.body.firstName, req.body.familyName,
            req.body.birth, req.body.address, req.body.email, req.user.email];

    connection.query(sqlQuery,
        parameters, function(err, rows){
            if(err){
                if(err.errno==1062){
                    res.json({message: "Email already taken", token: null})
                }else
                    res.json({message:"error in database", token:null})
            }
            else {

                TODO: "BYT UT EMAIL MOT USER ID"
                var token = jwtGen.sign({email: req.body.email}, conf.jwtSecret)
                return res.json({message: "success", token: token})

            }
        }


    );
});

app.get('/image/:type/:company', authenticate, function(req, res){


})

app.post('/auth/change_pw', authenticate, function(req, res) {

    connection.query('UPDATE users SET password=? WHERE email=? AND password=?',
        [req.body.newPassword, req.user.email, req.body.oldPassword], function(err, rows){
            if(err){
                return res.json("error in database")
            }

            if (rows.affectedRows == 0)
                return res.json("Wrong password")
            res.json("Password successfully changed")

        }

    );
});


app.use(session({ secret: 'alexluktar' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


TODO: "HASH PASSWORD"
app.post('/auth/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            return next(err); }
        if (!user) {
            return res.json(info)};
        return res.json(info);
    })(req, res, next);
});

app.post('/auth/signin', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
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

