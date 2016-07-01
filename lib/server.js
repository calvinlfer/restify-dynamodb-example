'use strict';
const restify = require('restify');
const AWS = require('aws-sdk');
const persons = require('./persons');

function configureServer(options) {
    const server = restify.createServer(options.server || {});
    const dynamoDocClient = new AWS.DynamoDB.DocumentClient();
    const personsRoutes = persons(dynamoDocClient, options.tableName);

    server.use(restify.bodyParser());

    server.get(
        '/persons/:id', 
        (req, res, next) => {
            const id = req.params.id;
            if (id == "") {
                res.send(400, {
                    message: "Please enter a UUID"
                })
            } else {
                req.personId = id;
                next();
            }
        },
        personsRoutes.getById
    );

    server.post(
        '/persons',
        (req, res, next) => {
            if (!req.body) {
                res.send(400, {
                    message: "Please provide a person"
                })
            }

            req.person = req.body;
            next()
        },
        personsRoutes.create
    );

    server.get(
        '/persons',
        personsRoutes.getAll
    );

    return server;
}

module.exports = configureServer;