'use strict';
const uuid = require('uuid');

function persons(dynamoDocClient, tableName) {
    function create(req, res, _) {
        const person = req.person;
        const dynamoRequest = {
            TableName: tableName,
            Item: {
                id:         uuid.v4(),
                firstName:  person.firstName,
                lastName:   person.lastName,
                studentId:  person.studentId,
                gender:     person.gender
            }
        };

        dynamoDocClient
            .put(dynamoRequest)
            .promise()
            .then(data => res.send(data))
            .catch(err => res.send(400, {error: err}))
    }
    
    function getById(req, res, next) {
        const id = req.personId;
        const dynamoRequest = {
            TableName: tableName,
            Item: {
                Key: {id}
            }
        };

        dynamoDocClient
            .get(dynamoRequest)
            .promise()
            .then(data => res.send(data))
            .catch(err => res.send(400, {error: err}))
    }
    return {
        create,
        getById
    }
}

module.exports = persons;