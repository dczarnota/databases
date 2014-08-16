var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  console.log("findAllMessages ran")
  dbConnection.query('SELECT * message from messages', cb);
};

exports.findUser = function(username, cb){
  console.log("findUser ran");
  dbConnection.query('SELECT name, id from users WHERE name = \'' + username + '\'', function(err, result) {cb(err, result)});
};

exports.saveUser = function(username, cb){
    console.log("saveUser ran")
    console.log("username: ", username)
  dbConnection.query('INSERT into users (name) values (\'' + username + '\')', function(err) {
      if (!err) {
        dbConnection.query('SELECT name, id from users WHERE name = \'' + username + '\')', function(err,result) {cb(err, results)});
      };
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  console.log("saveMessage ran");
  var post = {message: message, id: userid, roomname:roomname};

  dbConnection.query('INSERT INTO messages SET ?', post, cb);

  // dbConnection.query('INSERT into messages (id, message, roomname) values (\'' + userid + '\',\'' + message + '\',\'' + roomname + '\')', cb);
};

