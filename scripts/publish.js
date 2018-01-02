const shell = require('shelljs');
const helpers = require('./helpers');

const tasks = helpers.tasks();

function main() {
  //copy updated compiled files to top-level 'dist' directory
  tasks.forEach(task => {
    console.log('copying '+ task + '...');
    shell.cp('-u', 'packages/' + helpers.packagePath(task) + '/build/' + helpers.packagePath(task) + '*.js', 'dist/')
  })
}


if (typeof require !== 'undefined' && require.main === module) {
    main();
}

module.exports = main; 
