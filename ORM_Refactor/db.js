var mysql = require('mysql');
var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatSequelize", "root", "");

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chatSequelize"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

var Users = sequelize.define('Users', {
  name: { type: Sequelize.STRING, allowNull: false, unique: true }
});

var Messages = sequelize.define('Messages', {
  message: { type: Sequelize.STRING, allowNull: false },
  roomname: { type: Sequelize.STRING, allowNull: false }
});

Users.hasMany(Messages);
Messages.belongsTo(Users);

sequelize.sync().success(function(){
  console.log("success");
});

exports.findAllMessages = function(cb){
  console.log("findAllMessages ran")
  Messages.findAll().success(function(messages){cb(null, messages)});
};

exports.findUser = function(username, cb){
  console.log("findUser ran");
  Users.findOrCreate({name: username}).success(function(user){
    cb(null, user);
  });
};


exports.saveMessage = function(message, userid, roomname, cb){
  console.log("saveMessage ran");
  var newMessage = Messages.build({message: message, UserId: userid, roomname:roomname});

  newMessage.save()
    .success(function(){
      cb();
    });
};

