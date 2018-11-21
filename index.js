'use strict';

const fs = require('fs');
const semver = require('semver');
const inquirer = require('inquirer');

const values = require('./values.js');


const questions = [
    { type: 'list', name: 'branch', message: 'Выберите тип ветви', choices: values.typesBranch },
    // { type: 'list', name: 'sugarLevel', message: 'Choose your sugar level', choices: values.sugarPlain },
    // { type: 'confirm', name: 'decaf', message: 'Do you prefer your coffee to be decaf?', default: false },
    // { type: 'confirm', name: 'cold', message: 'Do you prefer your coffee to be cold?', default: false },
    // { type: 'list', name: 'servedIn', message: 'How do you prefer your coffee to be served in', choices: values.servedIn },
    // { type: 'confirm', name: 'stirrer', message: 'Do you prefer your coffee with a stirrer?', default: true },
];

const cliParams = process.argv;
const updateVersion = cliParams[2];
//console.log(semver.inc('0.1.1', 'patch'));

var PACKAGE = require('./package.json');
var version = PACKAGE.version; 

console.log('current version', version);
PACKAGE.version = semver.inc(version, updateVersion);
console.log('update version', PACKAGE.version);

let data = JSON.stringify(PACKAGE, null, '\t');
fs.writeFileSync('./package.json', data);

inquirer
    .prompt(questions)
    .then(function(data) {
    	switch(data.branch) {
    		case 'release':
    			console.log('start release branch');
    			const release = require('./release.js');
    			release.start(function(data) {
    				console.log(data);
    			});
    			// getGitUser();
    			break;
    		case 'hotfix':
    			console.log('start hotfix branch');
    			break;
    		case 'feature':
    			console.log('start feature branch');
    			break;
    	}
})

// 1. cli-ui выбор версии 'major' 'minor' 'patch'

// Релиз
// release_
// 
// npm run release start
// npm run release save

// Хотфикс -> npm run hotfix start -> переключиться на мастер -> обновить мастер -> создать ветку для релиза -> переключиться на неё
// hotfix_
// 
// npm run hotfix start
// npm run hotfix save

// Фитча
// feature_
// 
// npm run feature start
// npm run feature save




