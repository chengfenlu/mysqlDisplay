var http =require('http');
var fs = require('fs');
//var nodemailer = require('nodemailer');
var mysql = require('mysql');


var server = http.createServer( page);

function page(req, res){
    if(req.url == '/hola'){
        console.log('create a server')
        res.end('ready');
    }//end if
    else if(req.url == '/mysql')  {
        traerMysql(req, res);
    }
    
    else{
        res.end('not exist');
    }

}

var connection = mysql.createConnection({
    host:'localhost',
    user:'neal',
    password: 'neal',
    database:'melten',
    port:3306

})


function traerMysql(requesst, response){
var query = connection.query(' select * from call',
 function(error, result){
     if (error) {throw error}
     else {
         var res= result;
         response.end(JSON.stringify(res));
     }

}//function
)// connection.query
}//traerMysql


server.listen(8079);