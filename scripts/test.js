const shell = require('shelljs');
const conf = require('./conf.json');
const helpers = require('./helpers');
const { spawn, fork} = require('child_process');
const chokidar = require('chokidar');

const tasks = helpers.tasks();

const rollup_args = ['-c', 'config/rollup.test.js'];

//if user passed watch flag to wrapper, use rollup's watch mode
if (helpers.args.watch) {
  rollup_args.unshift('--watch')
}

//build browser test
//run each package's test rollup command from the package's directory
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


//watch all *test.html files and copy them to build if they change
tasks.forEach(task => {
  let baseTestDir = 'packages/' + helpers.packagePath(task) + '/test/';
  let testDirGlob = baseTestDir + '*browser-test.js';
  //force copy once on init
  shell.ls(testDirGlob).forEach(path => copyHtml)
  //watch for changes
  const watcher = chokidar.watch(testDirGlob);
  watcher.on('change', copyHtml);
  watcher.on('add', copyHtml);
})

//run unit test files
tasks.forEach(task => {
  let testDirGlob = 'packages/' + helpers.packagePath(task) + '/test/*unit-test.js';
  shell.ls(testDirGlob).forEach(path => unitTest);
  const watcher = chokidar.watch(testDirGlob)
  watcher.on('change', unitTest);
  watcher.on('add', unitTest);
})

function unitTest(path) {
  fork(path);
}

function copyHtml(path) {
  let patharr = path.split('/');
  let file = patharr.pop();
  let newpath = patharr.join('/');
  console.log('copying ' + file + ' from ' + newpath);
  shell.cp(path, newpath.replace(/test/, 'build') + '/' + file);
}
