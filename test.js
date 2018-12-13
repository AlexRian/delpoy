'use strict';

var shell = require('shelljs');

console.log('TEST RUN');


if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

// // Copy files to release dir
// shell.rm('-rf', 'out/Release');
// shell.cp('-R', 'stuff/', 'out/Release');

// Replace macros in each .js file
// shell.cd('lib');
// shell.ls('*.js').forEach(function (file) {
//   shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
//   shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
//   shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
// });
// shell.cd('..');

// Run external tool synchronously
// if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
//   shell.echo('Error: Git commit failed');
//   shell.exit(1);
// }


function newBranch(newBranch, originBranch) {

	if (shell.exec('git checkout '+originBranch).code !== 0) {
	  shell.echo('Error: Git checkout failed');
	  shell.exit(1);
	}

	if (shell.exec('git pull origin '+originBranch).code !== 0) {
	  shell.echo('Error: Git pull failed');
	  shell.exit(1);
	}
	if (shell.exec('git checkout -b '+newBranch+' origin/'+originBranch).code !== 0) {
	  shell.echo('Error: Git make new branch failed');
	  shell.exit(1);
	}
}


// newBranch('32434-simulator', 'develop');

delpoy('32434-simulator', 'develop');

function delpoy(branch, targetBranch) {
	if (shell.exec('git checkout '+branch).code !== 0) {
	  shell.echo('Error: Git checkout failed');
	  shell.exit(1);
	}
	if (shell.exec('git pull origin '+branch).code !== 0) {
	  shell.echo('Error: Git pull failed');
	  shell.exit(1);
	}
	if (shell.exec('git checkout '+targetBranch).code !== 0) {
	  shell.echo('Error: Git checkout failed');
	  shell.exit(1);
	}
	if (shell.exec('git pull origin '+targetBranch).code !== 0) {
	  shell.echo('Error: Git pull failed');
	  shell.exit(1);
	}
	if (shell.exec('git merge --no-ff '+branch).code !== 0) {
	  shell.echo('Error: Git merge failed');
	  shell.exit(1);
	}
	if (shell.exec('git push origin '+targetBranch).code !== 0) {
	  shell.echo('Error: Git push failed');
	  shell.exit(1);
	}
}