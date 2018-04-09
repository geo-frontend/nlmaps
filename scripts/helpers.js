const conf = require('./conf.json');
const ArgumentParser = require('argparse').ArgumentParser;

//console.log('what are the argvars?')
//console.log(process.argv)
const parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});
parser.addArgument(
  [ '-w', '--watch' ],
  {
    action: 'storeTrue',
    defaultValue: false,
    help: 'start rollup in watch mode (only used for build script).'
  }
);
parser.addArgument(
  ['-p', '--packages'],
  {
    help: 'the packages to build as a comma-separated list: -p leaflet,openlayers,nlmaps'
  }
);
parser.addArgument(
  [ '--coverage' ],
  {
    action: 'storeTrue',
    defaultValue: false,
    help: 'report coverage for unit tests'
  }
);

const args = parser.parseArgs();

//server argument selects packages from config for which it makes sense to start live-server.
function determineTaskList(packages, server=false) {
  let packages
  if ( packages === null ) {
    return server ? conf.live_server_packages : conf.packages; 
  } else if (typeof packages === 'string'){
    return packages.split(',')
  } else {
    throw 'problem reading list of packages. It is neither empty nor a comma-separated list.'
  }
}

function isServableTask(arg) {
  return conf.live_server_packages.includes(arg);
}
//server argument to check against all packages or only those for which starting live-server makes sense
function isRegisteredTask(arg) {
  console.log('server is: ', this.server)
  const flag = this.server ? conf.live_server_packages.includes(arg) : conf.packages.includes(arg);
  if (!flag) {
    console.log('WARNING: a package name (' + arg +') was provided which is not specified in scripts/conf.json. Ignoring it.')
  }
  return flag;
}

function packagePath(name){
  if (name === 'nlmaps') {
    return 'nlmaps';
  }
  return 'nlmaps-' + name;
}

//the main function: creates a list of packages to operate on,
//using all registered packages unless the user provides a list.
//set server=true to use live_server_package list instead of all packages.
function tasks(server=false){
  let that = this;
  that.server = server;
  let tasks = determineTaskList(args.packages, server).filter(isRegisteredTask, that);
  return tasks;
}

module.exports = {
  packagePath: packagePath,
  isRegisteredTask: isRegisteredTask,
  isServableTask: isServableTask,
  tasks: tasks,
  args: args
}
