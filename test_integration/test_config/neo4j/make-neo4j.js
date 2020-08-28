'use strict';

const neo4j = require('neo4j-driver');

const makeNeo4j = (credentials) => {
	const state = {driver: null};

	const init = () => Promise.resolve()
		.then(() => neo4j.driver(credentials.url, neo4j.auth.basic(credentials.user, credentials.password), {disableLosslessIntegers: true}))
		.then((driver) => state.driver = driver)
		.then(() => console.log('[NEO4J] connected.'));

	const shutdown = () => Promise.resolve()
		.then(() => state.driver.close())
		.then(() => console.log('[NEO4J] connection closed.'));

	const run = (query, variables) => Promise.resolve(state.driver.session())
		.then((session) => session.run(query, variables)
			.then((res) => res)
			.finally(() => session.close())
		);

	// const run = (query, variables) => {
	// 	if (!state.driver) return Promise.reject(new Error('[NEO4J] run failed.'));
	// 	const session = state.driver.session();
	// 	return session.run(query, variables)
	// 		.then((res) => res)
	// 		.finally(() => session.close());
	// };

	return {
		getDriver: () => state.driver,
		run,
		init,
		shutdown
	};
};

module.exports = makeNeo4j;
