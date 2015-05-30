var Entry = require('./entry');
var Datastore = require('nedb');
var db = new Datastore({ filename: "./diaries", autoload: true });
var moment = require('moment');


var random_num = function (hello) {
    var doc = new Entry(hello);
    doc.date();
    return db.insert(doc, function (err, newDoc) {
        if (err) throw (err);
    });
};
var other_thing =  function (moment) {
    var date = moment.toDate();
    return db.find({ date: {$gte: date }}).sort({date: 1}).exec(function (err, docs) {
        display(docs);
    });
};

var find_entry = function(moment) {
    var formatted = moment.format('LL');
    db.find({ moment: formatted}).sort({ date: 1 }).exec(function (err, docs) {
        display(docs)
    });
};

function display(docs) {
    docs.forEach(function(doc) {
        console.log(doc.moment);
        console.log(doc.entry);
    });
}

module.exports.random_num = random_num;
module.exports.other_thing = other_thing;
module.exports.find_entry = find_entry;