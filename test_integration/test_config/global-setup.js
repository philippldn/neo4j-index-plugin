/* eslint max-len: 0 */
const neo4jDockerSetup = require('./neo4j/docker-setup');

const globalSetup = async () => {
	console.log('[../test_config/global-setup.js] Starting global setup...');
	await neo4jDockerSetup();
	console.log('[../test_config/global-setup.js] ...global setup done!');
};

module.exports = globalSetup;
