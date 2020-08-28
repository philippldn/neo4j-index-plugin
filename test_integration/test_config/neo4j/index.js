'use strict';

const makeNeo4j = require('./make-neo4j');
const config = require('./config');

const credentials = {
	url: `bolt://localhost:${config.boltPort}`,
	user: config.username,
	password: config.password
};

const neo4j = makeNeo4j(credentials);

module.exports = neo4j;
