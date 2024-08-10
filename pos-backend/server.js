//Start this server by running 'node server.js' in the directory of this file.

// server.js 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;
//Connect to the server by using localhost with 3001 as the port.

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'reactPOS'
});

// Connect to the database
//db.connect will try to connect to the DB sever, if there is an error, it will return
// an error to the err variable through a lambda function.  If no error is found
// and the connection is established, then it will return a null.
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});



//DB query test
db.query('select * from users', (error, results) => {
  console.log(results);
  
  for(var i = 0; i < results.length; i++) {
    console.log(results[0].fName);
    console.log(results[0].lName);
  }


});






//Arrow or Lambda functions
// Parameter => statements
// Parameters we pass through => The statements we run that have access to those paramters


app.post('/api/login', (req, res) => {
  console.log(req.body);
  db.execute("select * from users where userID = ? and userPassword = ?", [req.body["ID"], req.body["PIN"]], (err, results) => {
    if(err) {
      throw err;
    } else if(results.length == 0) {
      res.send(results)
    } else {
      results[0]["userPassword"] = null;
      res.send(results);
    }
  });

});

app.post('/api/message', (req, res) => {
  const message = req.body.message;
  console.log('Received message:', message);
  res.send(message);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
