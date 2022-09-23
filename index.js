//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});


//route for insert data
app.post('/save',(req, res) => {
  let data = {m_name: req.body.m_name, Email_address: req.body.Email_address,claim_flag: 1};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET m_name='"+req.body.m_name+"', Email_address='"+req.body.Email_address+"' WHERE id="+req.body.id==37;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

// //route for delete data
// app.post('/delete',(req, res) => {
//   let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//       res.redirect('/');
//   });
// });

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
