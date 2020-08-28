'use strict';

const one = require('./01');

const fulltextIndexesTests = (neo4j, plugin) => {
	test('1. Check fulltext indexes are defined',
		one(neo4j, plugin));
};

module.exports = fulltextIndexesTests;
