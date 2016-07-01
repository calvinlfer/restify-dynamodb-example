'use strict';
const configureServer = require('./lib/server');

const server = configureServer({
    server: {},
    tableName: "persons"
});

server.listen(8080, () => console.log("Listening on 8080"));
