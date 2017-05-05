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

 app.get(`/api/companies/:id1`, (req,res)=> {
     let companies = [
  {
      company: 'Byggvesta',
      city: 'Linköping',
      id: 'byggvestaLink',
      image: 'byggvesta.png',
      cover: 'ByggvestaHeader.png',
      info: 'Rent apartments and book laundromat'
    },
    {
      company: 'Byggvesta',
      city: 'Stockholm',
      id: 'byggvestaSthlm',
        image: 'byggvesta.png',
      cover: 'ByggvestaHeader.png',
        info: 'Rent apartments and book laundromat'
    },
    {
      company: 'Datateknologsektionen',
      city: 'Linköping',
      id: 'dsektionenLiu',
        image: 'd-sektionen.png',
      cover: 'd-sektionenHeader.png',
        info: 'Rent our car etc.'
    },
    {
      company: 'Maskinteknologsektionen',
      city: 'Linköping',
      id: 'msektionenLiu',
        image: 'm-sektionen.png',
      cover: 'm-sektionenHeader.png',
        info: 'Rent our car etc.'
    }
  ];
     res.json(companies.filter(company=>company.id ===req.params.id1)[0]);
 })

app.get('/api/booking/current', (req, res) => {
  let current = [
  {
    'id': 'laundromat1',
    'name': 'Laundromat',
    'country': 'cu',
    'birth': '1973',
    'image': 'Laundromat.png',
    'cover': 'LaundromatHeader.png',
    'link': 'https://en.wikipedia.org/wiki/Self-service_laundry',
      'info': 'Very nice laundromat. Please remember to clean the filters after use.',
    'medals': [
      { 'year': '1992', 'type': 'B', 'city': 'Barcelona', 'event': 'Olympic Games', 'category': '-57kg' },
      { 'year': '1993', 'type': 'B', 'city': 'Hamilton', 'event': 'World Championships', 'category': '-57kg' },
    ],
  },

    {
    'id': 'soccerField1',
    'name': 'Soccer Field',
    'country': 'cu',
    'birth': '1973',
    'image': 'SoccerField.png',
    'cover': 'SoccerFieldHeader.png',
    'link': 'https://en.wikipedia.org/wiki/Association_football',
        'info': 'Very nice soccer field.',
    'medals': [
      { 'year': '1992', 'type': 'B', 'city': 'Barcelona', 'event': 'Olympic Games', 'category': '-57kg' },
      { 'year': '1993', 'type': 'B', 'city': 'Hamilton', 'event': 'World Championships', 'category': '-57kg' },
    ],
  },
      {
    'id': 'soccerField2',
    'name': 'Soccer Field',
    'country': 'cu',
    'birth': '1973',
    'image': 'SoccerField.png',
    'cover': 'SoccerFieldHeader.png',
    'link': 'https://en.wikipedia.org/wiki/Association_football',
          'info': 'Very nice soccer field.',
    'medals': [
      { 'year': '1992', 'type': 'B', 'city': 'Barcelona', 'event': 'Olympic Games', 'category': '-57kg' },
      { 'year': '1993', 'type': 'B', 'city': 'Hamilton', 'event': 'World Championships', 'category': '-57kg' },
    ],
  },
      {
    'id': 'soccerField3',
    'name': 'Soccer Field',
    'country': 'cu',
    'birth': '1973',
    'image': 'SoccerField.png',
    'cover': 'SoccerFieldHeader.png',
    'link': 'https://en.wikipedia.org/wiki/Association_football',
          'info': 'Very nice soccer field.',
    'medals': [
      { 'year': '1992', 'type': 'B', 'city': 'Barcelona', 'event': 'Olympic Games', 'category': '-57kg' },
      { 'year': '1993', 'type': 'B', 'city': 'Hamilton', 'event': 'World Championships', 'category': '-57kg' },
    ],
  },
      {
    'id': 'soccerField4',
    'name': 'Soccer Field',
    'country': 'cu',
    'birth': '1973',
    'image': 'SoccerField.png',
    'cover': 'SoccerFieldHeader.png',
    'link': 'https://en.wikipedia.org/wiki/Association_football',
          'info': 'Very nice soccer field.',
    'medals': [
      { 'year': '1992', 'type': 'B', 'city': 'Barcelona', 'event': 'Olympic Games', 'category': '-57kg' },
      { 'year': '1993', 'type': 'B', 'city': 'Hamilton', 'event': 'World Championships', 'category': '-57kg' },
    ],
  },
      {
    'id': 'soccerField5',
    'name': 'Soccer Field',
    'country': 'cu',
    'birth': '1973',
    'image': 'SoccerField.png',
    'cover': 'SoccerFieldHeader.png',
    'link': 'https://en.wikipedia.org/wiki/Association_football',
          'info': 'Very nice soccer field.',
    'medals': [
      { 'year': '1992', 'type': 'B', 'city': 'Barcelona', 'event': 'Olympic Games', 'category': '-57kg' },
      { 'year': '1993', 'type': 'B', 'city': 'Hamilton', 'event': 'World Championships', 'category': '-57kg' },
    ],
  }
  ];
  res.json(current);
});

app.post('/api/companies', (req, res) => {
  let companies = [
  {
      company: 'Byggvesta',
      city: 'Linköping',
      id: 'byggvestaLink',
      image: 'byggvesta.png',
      cover: 'ByggvestaHeader.png',
      info: 'Rent apartments and book laundromat'
    },
    {
      company: 'Byggvesta',
      city: 'Stockholm',
      id: 'byggvestaSthlm',
        image: 'byggvesta.png',
      cover: 'ByggvestaHeader.png',
        info: 'Rent apartments and book laundromat'
    },
    {
      company: 'Datateknologsektionen',
      city: 'Linköping',
      id: 'dsektionenLiu',
        image: 'd-sektionen.png',
      cover: 'd-sektionenHeader.png',
        info: 'Rent our car etc.'
    },
    {
      company: 'Maskinteknologsektionen',
      city: 'Linköping',
      id: 'msektionenLiu',
        image: 'm-sektionen.png',
      cover: 'm-sektionenHeader.png',
        info: 'Rent our car etc.'
    }
  ];

  const escapedValue = req.body.query;
  const regex = new RegExp('\\b' + escapedValue, 'i');
  res.json(companies.filter(suggestion => regex.test(`${suggestion.company} ${suggestion.city}`)));
});

function getSuggestionValue(suggestion) {
    return `${suggestion.company} ${suggestion.city}`;
  }

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

app.listen(3333);
console.log('Listening on localhost:3333');

