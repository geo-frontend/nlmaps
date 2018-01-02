const shell = require('shelljs');
const conf = require('./conf.json');
const helpers = require('./helpers');
const { spawn } = require('child_process')

const tasks = helpers.tasks();
console.log('hooooo')
console.log(tasks)

const rollup_args = ['-c', 'config/rollup.all.js'];

//if user passed watch flag to wrapper, use rollup's watch mode
if (helpers.args.watch) {
  rollup_args.unshift('--watch')
}

function main() {
  //run each package's rollup command from the package's directory
  //and capture/log output
  tasks.forEach(task => {
    console.log(rollup_args)
    const build = spawn('rollup', rollup_args, {cwd: 'packages/' + helpers.packagePath(task)});

    build.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    build.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    build.on('close', (code) => {
      console.log(`child process for ${task} exited with code ${code}`);
    });
  })
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}

module.exports = main; 
