const shell = require('shelljs');
const conf = require('./conf.json');
const helpers = require('./helpers');
const { spawn, fork} = require('child_process');
const chokidar = require('chokidar');
const exitCode = require('tap-exit-code');

const tasks = helpers.tasks();
console.log(tasks)

const rollup_args = ['-c', 'config/rollup.test.js'];

//if user passed watch flag to wrapper, use rollup's watch mode
if (helpers.args.watch) {
  rollup_args.unshift('--watch')
}


//to be bound
function unitTest(task, path) {
  const testfile = 'packages/' + helpers.packagePath(task) + '/test/unit-test.js';
  if (helpers.args.coverage) {
    let sub = fork('node_modules/tap/bin/run.js', ['--cov', testfile], {stdio: 'pipe'});
    //sub.stdout.pipe(exitCode()).pipe(process.stdout);
  } else {
    let sub = fork( 'node_modules/tap/bin/run.js', [testfile], {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
    console.dir(sub);
    sub.stdout.pipe(exitCode()).pipe(process.stdout);
  }
}

function copyHtml(path) {
  let patharr = path.split('/');
  let file = patharr.pop();
  let newpath = patharr.join('/');
  console.log('copying ' + file + ' from ' + newpath);
  shell.cp(path, newpath.replace(/test/, 'build') + '/' + file);
}

function main(){
  //build browser test (in watch mode if --watch was specified)
  //run each package's test rollup command from the package's directory
  //and capture/log output
  tasks.forEach(task => {
    const build = spawn('../../node_modules/rollup/bin/rollup', rollup_args, {cwd: 'packages/' + helpers.packagePath(task)});

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
    let testDirGlob = baseTestDir + '*test.html';
    //force copy once on init
    shell.ls(testDirGlob).forEach(path => copyHtml)
    //watch for changes if --watch
    if (helpers.args.watch){
      const watcher = chokidar.watch(testDirGlob);
      watcher.on('change', copyHtml);
      watcher.on('add', copyHtml);
    }
  })

  //run unit test files
  tasks.forEach(task => {
    let testDirGlob = ['packages/' + helpers.packagePath(task) + '/test/*unit-test.js', 'packages/' + helpers.packagePath(task) + '/src/*.js'];
    unitTest.bind(this, task)();
    //watch for changes if --watch
    if (helpers.args.watch){
      const watcher = chokidar.watch(testDirGlob)
      watcher.on('change', unitTest.bind(this, task));
      watcher.on('add', unitTest.bind(this, task));
    }
  })
}


if (typeof require !== 'undefined' && require.main === module) {
    main();
}

module.exports = main; 
