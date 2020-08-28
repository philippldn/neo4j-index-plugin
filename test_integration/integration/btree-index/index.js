'use strict';

const one = require('./01');

const btreeIndexesTests = (neo4j, plugin) => {
	test('1. Check btree indexes are defined',
		one(neo4j, plugin));
};

module.exports = btreeIndexesTests;
