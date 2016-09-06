var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var runSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    starttime: Date,
    elapsed: Number,
    metadata: String,
    created_at: { type: Date, default: Date.now }
});

var runModel = mongoose.model('run', runSchema);
module.exports = runModel;