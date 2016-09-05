var mongoose = require('mongoose');
var appconfig = require('../app.config');
var dbConnection;

var DBService = {
    "connect": connect
};

function connect() {
    if (!(dbConnection !== undefined && dbConnection._hasOpened)) {
        mongoose.connect(appconfig.mongodbConnectionString);
        dbConnection = mongoose.connection;
        dbConnection.on('error', console.error.bind(console, 'connection error:'));
        dbConnection.once('open', function () {
            // we're connected!
            console.log("connected...");
        });
    }
}

function close() {
    dbConnection.close();
}

module.exports = DBService;