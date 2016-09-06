// var mongoose = require('mongoose');
// var appconfig = require('../app.config');
// var dbConnection;

// var DBService = {
//     "connect": connect
// };

// function connect() {
//     if (!(dbConnection !== undefined && dbConnection._hasOpened)) {
//         mongoose.connect(appconfig.mongodbConnectionString);
//         dbConnection = mongoose.connection;
//         dbConnection.on('error', console.error.bind(console, 'connection error:'));
//         dbConnection.once('open', function () {
//             // we're connected!
//             console.log("connected...");
//         });
//     }
// }

// function close() {
//     dbConnection.close();
// }

// module.exports = DBService;

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var appconfig = require('../app.config');
var dbservice = {};

// Connection URL
var url = appconfig.mongodbConnectionString;

dbservice.InsertBulk = function (data, collectionName, callback) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log(err);
        console.log("Connected successfully to server usning native mongoDriver");
        insertDocuments(data, db, collectionName, function () {
            db.close();
            callback();
        });
    });
};


var insertDocuments = function (data, db, collection, callback) {
    
    var collection = db.collection(collection);
    collection.insertMany(data, function (err, result) {
        assert.equal(err, null);
        console.log(err);
        console.log("insert done...");
        callback(result);
    });
}

module.exports = dbservice;