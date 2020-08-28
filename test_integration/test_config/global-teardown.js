'use strict';

const neo4jDockerTeardown = require('./neo4j/docker-teardown');

const globalTeardown = async function() {
	console.log('[../test_config/global-teardown.js] Starting global teardown...');
	await neo4jDockerTeardown();
	console.log('[../test_config/global-teardown.js] ...global teardown done!');
};

module.exports = globalTeardown;
