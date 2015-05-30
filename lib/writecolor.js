var chalk = require('chalk');

var witches_cauldron = function (str){
    console.log(chalk.white.bgBlack(str));
};

var other_worldly = function(str){
    console.log(chalk.green.bgBlack(str));
};

var precious_stones = function(str){
    console.log(chalk.white.bgRed(str));
};

var summer_breeze = function(str){
    console.log(chalk.white.bgBlue(str));
};

var classic_beauty = function(str){
    console.log(chalk.magenta.bgWhite(str));
};

var gentle_touch = function(str){
    console.log(chalk.blue.bgWhite(str));
};

module.exports.witches_cauldron = witches_cauldron;
module.exports.other_worldly = other_worldly;
module.exports.precious_stones = precious_stones;
module.exports.summer_breeze = summer_breeze;
module.exports.classic_beauty = classic_beauty;
module.exports.gentle_touch = gentle_touch;
