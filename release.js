'use strict';

var exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}

module.exports.start = function(callback){
    execute("git checkout develop", function(name) {
    	console.log(name);
        // execute("git config --global user.email", function(email){
        //     callback({ name: name.replace("\n", ""), email: email.replace("\n", "") });
        // });
    });
};
