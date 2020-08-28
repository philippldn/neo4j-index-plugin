/* eslint max-len: 0 */
const util = require('util');
const childProcess = require('child_process');
const config = require('./config');
const dockerTeardown = require('./docker-teardown');
const execPromise = util.promisify(childProcess.exec);

const dockerSetup = async () => {
	try {
		await setup();
	} catch (err) {
		console.log('[../test_config/neo4j/docker-setup.js] ERROR running docker-setup');
		console.log('[../test_config/neo4j/docker-setup.js] Retrying once after docker-teardown...');
		await dockerTeardown();
		await setup();
	}
};

module.exports = dockerSetup;


async function setup() {
	console.log('[../test_config/neo4j/docker-setup.js] Creating neo4j docker container...');
	await execPromise(`
		docker run \
			--name ${config.containerName} \
			-p${config.httpPort}:7474 -p${config.boltPort}:7687 \
			-d \
			--env NEO4J_AUTH=${config.username}/${config.password} \
			--env NEO4JLABS_PLUGINS=["apoc"] \
			neo4j:3.5.17
	`);
	console.log(`[../test_config/neo4j/docker-setup.js] Waiting ${config.secondsBeforeFirstConnectionAttempt}s for neo4j instance to start...`);
	await delay(config.secondsBeforeFirstConnectionAttempt * 1000);
	console.log('[../test_config/neo4j/docker-setup.js] ...done!');
}

function delay(t) {
	return new Promise(function(resolve) {
		setTimeout(resolve, t);
	});
}
