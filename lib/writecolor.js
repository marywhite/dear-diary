var chalk = require('chalk');


var get_theme = function(scheme){
    switch (scheme){
        case "witches cauldron" :
            return witches_cauldron;
        case "other worldly" :
            return other_worldly;
        case "precious stones" :
            return precious_stones;
        case "classic beauty" :
            return classic_beauty;
        case "summer breeze" :
            return summer_breeze;
        case "gentle touch" :
            return gentle_touch;
        default :
            return;
    }
};


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
    },
    color: function(str){
        return chalk.blue.bgWhite(str);
    }
};


module.exports = get_theme;
