// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var serviceResponseSchema = new Schema({
//     id: { type: String, required: true },
//     request: String,
//     body: String,
//     starttime: Date,
//     elapsed: Number,
//     error: Boolean,
//     uri: String,
//     responselength: Number,
//     statuscode: Number,
//     exception: String,
//     created_at: { type: Date, default: Date.now }
// });

// var serviceResponse = mongoose.model('servicetimings', serviceResponseSchema);


var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var appconfig = require('../app.config');
var serviceResponse = {};

// Connection URL
var url = appconfig.mongodbConnectionString;

serviceResponse.InsertBulk = function (data, callback) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server usning native mongoDriver");
        insertDocuments(data, db, function () {
            db.close();
            callback();
        });
    });
};


var insertDocuments = function(data, db, callback) {
  // Get the documents collection
  var collection = db.collection('servicetimings');
  // Insert some documents
  collection.insertMany(data, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

module.exports = serviceResponse;