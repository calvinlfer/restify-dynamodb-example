'use strict';
const restify = require('restify');
const AWS = require('aws-sdk');
const persons = require('./persons');

AWS.config.update({
    endpoint: new AWS.Endpoint('http://localhost:8000')
});

function configureServer(options) {
    const server = restify.createServer(options.server || {});
    const dynamoDocClient = new AWS.DynamoDB.DocumentClient();
    const personsRoutes = persons(dynamoDocClient, options.tableName);

    server.get(
        '/persons/:id', 
        (req, res, next) => {
            res.send(req.params);
        }
    );

    return server;
}

module.exports = configureServer;