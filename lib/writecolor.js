var chalk = require('chalk');

var witches_cauldron = {
    log: function (str){
        console.log(chalk.white.bgBlack(str));
    },
    emphasis: function (str){
        console.log(chalk.white.bgBlack.bold(str));
    },
    invert: function (str){
        console.log(chalk.white.bgBlack.inverse(str));
    }
};


var other_worldly = {
    log: function (str){
        console.log(chalk.green.bgBlack(str));
    },
    emphasis: function (str){
        console.log(chalk.green.bgBlack.bold(str));
    },
    invert: function (str){
        console.log(chalk.green.bgBlack.inverse(str));
    }
};

var precious_stones = {
    log: function (str){
        console.log(chalk.magenta.bgWhite(str));
    },
    emphasis: function (str){
        console.log(chalk.magenta.bgWhite.bold(str));
    },
    invert: function (str){
        console.log(chalk.magenta.bgWhite.inverse(str));
    }
};

var summer_breeze = {
    log: function (str){
        console.log(chalk.white.bgBlue(str));
    },
    emphasis: function (str){
        console.log(chalk.white.bgBlue.bold(str));
    },
    invert: function (str){
        console.log(chalk.white.bgBlue.inverse(str));
    }
};

var classic_beauty = {
    log: function (str){
        console.log(chalk.white.bgRed(str));
    },
    emphasis: function (str){
        console.log(chalk.white.bgRed(str));
    },
    invert: function (str){
        console.log(chalk.white.bgRed.inverse(str));
    }
};

var gentle_touch = {
    log: function (str){
        console.log(chalk.blue.bgWhite(str));
    },
    emphasis: function (str){
        console.log(chalk.blue.bgWhite(str));
    },
    invert: function (str){
        console.log(chalk.blue.bgWhite.inverse(str));
    }
};


module.exports.witches_cauldron = witches_cauldron;
module.exports.other_worldly = other_worldly;
module.exports.precious_stones = precious_stones;
module.exports.summer_breeze = summer_breeze;
module.exports.classic_beauty = classic_beauty;
module.exports.gentle_touch = gentle_touch;
