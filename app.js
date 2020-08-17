
var mysql      = require('mysql');
var express = require('express');
const app = express();

app.listen(4000);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456Mysql',
  database : 'testdb',
  port     : 3306,
});
 
connection.connect();

app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}));
//app.use(morgan('dev'));

app.get('/',(req,res)=>{
  var sql ='SELECT * FROM Blogs'
    connection.query(sql , (error, reslt , fields)=>{
      if (error) throw error;
      res.render('index',{reslt});
      
    })
  
})
app.post('/',(req,res)=>{

const title1 = req.body.title ; 
const snippet1 = req.body.snippet;
const body1 = req.body.body ; 

// console.log ( title, snippet, body);
var sql = "INSERT INTO Blogs(title,snippet,body) VALUES ('"+ title1+"','"+ snippet1+"','"+ body1+"');" 
//var sql = `INSERT INTO Blogs(title,snippet,body) VALUES (${title1},${snippet1},${body1});`;
connection.query(sql, (error , result)=>{
if (error) throw error;
console.log('insert success');
res.redirect('/');
}); 

})
app.get('/about',(req,res)=>{
  res.render('about');
})
app.get('/blogs/create',(req,res)=>{
  res.render('create');
})


  app.get('/add-blog',()=>{
    var sql = "INSERT INTO Blogs(title,snippet,body) VALUES ('name2','name2','name2')";
connection.query(sql, (error , result , fields)=>{
if (error) throw error;
console.log('insert success');
}); 

  })
  
app.use((req,res)=>{
  res.render('404');
})





 

