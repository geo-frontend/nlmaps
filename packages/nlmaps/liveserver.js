var liveServer = require('../../node_modules/live-server/index.js');
 
var params = {
    root: 'build',
    port: '8080',
    open: true, // When false, it won't load your browser by default. 
    ignore: '', // comma-separated string for paths to ignore 
    //wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec. 
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots 
    https: 'node_modules/live-server-https'
};
liveServer.start(params);
