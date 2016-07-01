'use strict';
const uuid = require('uuid');

function persons(dynamoDocClient, tableName) {
    function create(req, res, _) {
        const person = req.person;

        const personRequest = {
            personId:   uuid.v4(),
            firstName:  person.firstName,
            lastName:   person.lastName,
            studentId:  person.studentId,
            gender:     person.gender
        };

        const dynamoRequest = {
            TableName: tableName,
            Item: personRequest
        };

        dynamoDocClient
            .put(dynamoRequest)
            .promise()
            .then(data => res.send(personRequest))
            .catch(err => res.send(400, {error: err}))
    }
    
    function getById(req, res, _) {
        const personId = req.personId;
        const dynamoRequest = {
            TableName: tableName,
            Key: {personId}
        };

        dynamoDocClient
            .get(dynamoRequest)
            .promise()
            .then(data => res.send(data.Item))
            .catch(err => res.send(400, {error: err}))
    }

    function getAll(req, res, _) {
        const dynamoRequest = {
            TableName: tableName
        };
        dynamoDocClient
            .scan(dynamoRequest)
            .promise()
            .then(data => res.send(data))
            .catch(err => res.send(503, {error, err}))
    }

    return {
        create,
        getById,
        getAll
    }
}

module.exports = persons;