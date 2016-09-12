
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var appconfig = require('../app.config');
var Promise = require('bluebird');
const RUNS = 'runs';
const SERVICETIIMINGS = 'servicetimings';

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

dbservice.getServiceRuns = function (callbackfn) {
    Promise.promisify(MongoClient.connect, { multiArgs: true, context: MongoClient });
    MongoClient.connect(url).then(function (db) {
        var collection = db.collection(RUNS);
        collection.find({}).limit(20).toArray(function (err, data) {
            db.close();
            if (err) {
                console.log(err);
                callbackfn(err, null);
            }
            return callbackfn(null, data);
        });
    }).catch(function (err) {
        console.log(err);
    });
};


dbservice.getServiceRunsById = function (value, callbackfn) {
    Promise.promisify(MongoClient.connect, { multiArgs: true, context: MongoClient });
    MongoClient.connect(url).then(function (db) {
        var collection = db.collection(SERVICETIIMINGS);
        collection.find({ id: value }).toArray(function (err, data) {
            db.close();
            if (err) {
                console.log(err);
                callbackfn(err, null);
            }
            return callbackfn(null, data);
        });
    }).catch(function (err) {
        console.log(err);
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