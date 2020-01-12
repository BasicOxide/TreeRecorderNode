const express = require("express");
const pg=require("pg").Pool;
const bodyParser = require('body-parser'); 


const app = express();

const pool=new pg({host:'ec2-54-246-92-116.eu-west-1.compute.amazonaws.com',database:'d7282ltlse8hjs',user:'pgwexrlmarqoud',password:'041ac3891c018c06e8e6b3b725f0369fa3749529fac878da6fe1228d0448c2ca',port:'5432',ssl:true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

const _port = process.env.PORT || 5000;
const _app_folder = __dirname + '/dist' ;
app.use(express.static(__dirname + '/dist' ));


app.post('/register', function(request, response){
    console.log(request.body.Name);
    pool.query("INSERT INTO trees VALUES('"+request.body.Name+"',"+request.body.Latitude+","+request.body.Longitude+","+request.body.Height+");", (err1, res1) => 
        {        
            if(err1) 
                {   console.log(request.body);
                    return console.log(err1);}
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/plain');
                response.redirect("store.html")     
        }); 
});



app.get("/view",function(req,res)
{
    pool.query("select row_to_json(t) as DATA from (select name,latitude,longitude,height from trees) t;", (err1, res1) => 
        {   
            if(err1) {return console.log(err1);}
            res.send(res1.rows)        
        });         
});


app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});