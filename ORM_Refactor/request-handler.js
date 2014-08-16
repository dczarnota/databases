var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;


exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (err, results) {
      var chat = {
        message: message.message,
        userid: results.id,
        roomname: message.roomname
      };

      saveMessage(chat.message, chat.userid, chat.roomname, function () {
        console.log("chat before sendResponse: ",chat);
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
    console.log("message: ",msg);
      message = msg;
      findUser(message.name, resultsCallback);
  });
};

exports.getMessages = function(req, res) {
  findMessages(function(err, messages) {
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
