var config = require('./config');

var delimiter = function(){
    var line = '\n';
    for (var i = 0; i < process.stdout.columns; i++) {
        line += '/'
    }
    line += '\n';
    console.log(line);
};


var header = function(){
    var str = config.name().toLowerCase() + "\'s diary";
    var half = process.stdout.columns / 2;
    var position = Math.floor(half-(str.length/2));
    var space = '';
    for (var i = 0; i < position; i++){
        space += " ";
    }
    console.log(space + str);
};

module.exports.delimiter = delimiter;
module.exports.header = header;

