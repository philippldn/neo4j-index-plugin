'use strict';

const util = require('util');
const childProcess = require('child_process');
const config = require('./config');
const execPromise = util.promisify(childProcess.exec);

const dockerTeardown = async function() {
	console.log('[../test_config/neo4j/docker-teardown.js] Stopping neo4j docker container...');

	try {
		await execPromise(`docker stop ${config.containerName}`);
	} catch (err) {
		console.log('[../test_config/neo4j/docker-teardown.js] ERROR stopping neo4j docker container.');
	}

	console.log('[../test_config/neo4j/docker-teardown.js] Removing neo4j docker container...');

	try {
		await execPromise(`docker rm ${config.containerName}`);
	} catch (err) {
		console.log('[../test_config/neo4j/docker-teardown.js] ERROR removing neo4j docker container.');
	}

	console.log('[../test_config/neo4j/docker-teardown.js] ...done!');
};

module.exports = dockerTeardown;
