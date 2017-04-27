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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/*const authCheck = jwt({
  secret: 'FC_TDGQvIW5oenBn04qOMrCJsTZMs5CbvSFMsw-MiAugv8yDWMC2WqT3af64PiRF',
  audience: 'ZN96W6dVcHVB_nw93rkRMRQt1DNHFAby'
});*/


 var connection = mysql.createConnection({
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
 });

 app.get("/",function(req,res){
 connection.query('SELECT * from users LIMIT 2', function(err, rows, fields) {
 connection.end();
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
   });
 });


app.get('/api/booking/current', (req, res) => {
  let current = [
  {
      id: 1,
      object: "Fotbollsplan",
      renter: "Bollkalle Corp."
  },
  {
      id: 2,
      object: 'Tvättstuga',
      renter: "Bollkalle Corp."
  },
  {
      id: 3,
      object: 'Grill',
      renter: "Bollkalle Corp."
  }
  ];
  res.json(current);
})

app.listen(3333);
console.log('Listening on localhost:3333');

