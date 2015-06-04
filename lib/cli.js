var Entry = require('./entry');
var Datastore = require('nedb');
var db = new Datastore({ filename: "./diaries", autoload: true, corruptAlertThreshold: 1 });

var colors = require ('./writecolor');
var config = require('./config');
var current_scheme = config.scheme();
var write = colors(current_scheme);
var encryption = require('./encryption');
var ui = require('./ui');

var random_num = function (str) {
    var doc = new Entry(str);
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
    if (formatted != "Invalid date") {
        db.find({moment: formatted}).sort({date: 1}).exec(function (err, docs) {
            display(docs)
        });
    } else {
        console.log('please enter a valid date input')
    }
};

var delete_last = function(doc){
    if (doc[0] != null ){
        var id = doc[0]["_id"];
        db.remove({ _id: id }, {}, function (err) {
            if (err) throw (err);
        });
    } else {
        write.emphasis('no entries to delete...')
    }
};

var find_last = function(func){
    db.find({}).sort({ date: -1 }).limit(1).exec(function (err, doc) {
        func(doc);
    });
};

function display(docs) {
    ui.delimiter();
    ui.header(config.name().toLowerCase() + "\'s diary");
    if (docs[0] != null){
        ui.delimiter();
        docs.forEach(function(doc) {
            var entry = encryption.decrypt(doc.entry);
            write.invert(doc.moment);
            write.log(entry);
            ui.delimiter();
        });
    } else {
        write.emphasis('no entries to display...')
    }
}

module.exports.random_num = random_num;
module.exports.other_thing = other_thing;
module.exports.find_entry = find_entry;
module.exports.find_last = find_last;
module.exports.delete_last = delete_last;
module.exports.show_last = display;
