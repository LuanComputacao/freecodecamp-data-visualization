const liveServer = require('live-server');

const params = {
    port: 8080, // Set the port number you want to use
    root: './src', // Set the root directory of your project
    file: 'index.html', // Set the file you want to serve
    wait: 1000, // Set the delay in milliseconds before opening the browser
};

liveServer.start(params);
