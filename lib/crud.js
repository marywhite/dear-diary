var Entry = require('./entry')
    , Datastore = require('nedb')
    , path = require('path')
    , fs = require('fs')
    , diary_path = path.join(path.dirname(fs.realpathSync(__filename)), '../diaries')
    , db = new Datastore({ filename: diary_path, autoload: true, corruptAlertThreshold: 1 })
    , config = require('./config')
    , encryption = require('./encryption')
    , ui = require('./ui')

    , colors = require ('./writecolor')
    , write = colors.current_theme();

var new_entry = function (str) {
    var doc = new Entry(str);
    doc.date();
    return db.insert(doc, function (err, newDoc) {
        if (err) throw (err);
    });
};
var find_chunk =  function (moment) {
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
        write.emphasis('please enter a valid date input(e.g. yesterday, february 14 2011, monday, this week')
    }
};

var delete_last = function(doc){
    if (doc[0] != null ){
        var id = doc[0]["_id"];
        db.remove({ _id: id }, {}, function (err) {
            if (err) throw (err);
        });
    } else {
        write.emphasis('no entries to delete...enter <<dear-write>> to get started');
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
        write.emphasis('no entries to display...enter <<dear-diary write>> to get started')
    }
}

module.exports.new_entry = new_entry;
module.exports.find_chunk = find_chunk;
module.exports.find_entry = find_entry;
module.exports.find_last = find_last;
module.exports.delete_last = delete_last;
module.exports.show_last = display;
