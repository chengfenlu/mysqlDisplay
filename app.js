const express =require('express');
var path = require('path');
var bodyParser =require('body-parser');
var mysql = require('mysql');

const app = express();
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
// path does not need to require
app.use(bodyParser());

// connection create
const db = mysql.createConnection({
    host:'localhost',
    user:'neal',
    password: 'neal',
    database:'melten',
    port:3306
})

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// Create DB  // already exists
/* app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE melten';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});
 
// Create table //already exists
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//the following not use here
/* var connection = mysql.createConnection({
    host:'localhost',
    user:'neal',
    password: 'neal',
    database:'melten',
    port:3306
})
 */
//connection.connect(); why? still working when marked

var todoItems =  [ {id :  1, desc: 'fgfg'},
{id :  2, desc: 'trtr'},
];

//index
app.get('/', (req, res) => {
    res.render('index');
  });

// Select calls
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM calls ORDER BY id DESC';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log('Total calls fetched...');
        res.send(results);
    });
});

app.get('/top', (req, res) => {
    let sql = 'SELECT  * FROM calls ORDER BY id DESC LIMIT 20';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log('Recent calls fetched...');
        res.send(results);
    });
});

app.get('/room22', (req, res) => {
    let sql = 'SELECT  * FROM calls where room= 22 ORDER BY id DESC LIMIT 20';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log('Recent calls fetched...');
        res.send(results);
    });
});

app.get('/urgency3', (req, res) => {
    let sql = 'SELECT  * FROM calls where urgency =3  ORDER BY id DESC LIMIT 20';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log('Recent calls fetched...');
        res.send(results);
    });
});


function traerMysql(requesst, response){
var query = connection.query(' select * from calls',
 function(error, result){
     if (error) {throw error}
     else {
         var res= result;
         response.end(JSON.stringify(res));
     }
}//function
)// connection.query
}//traerMysql


app.listen(3000);