'use strict';
const AWS = require('aws-sdk');
const configureServer = require('./lib/server');

// local mode
AWS.config.update({
    accessKeyId:        'calvin',
    secretAccessKey:    'supersecret',
    endpoint:           'http://localhost:8000',
    region:             'us-east-1'
});

const server = configureServer({
    server: {},
    tableName: "persons"
});

server.listen(8080, () => console.log("Listening on 8080"));
