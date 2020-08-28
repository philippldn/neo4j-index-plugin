'use strict';

const one = require('./01');

const constraintsTests = (neo4j, plugin) => {
	test('1. Check unique constraints are defined',
		one(neo4j, plugin));
};

module.exports = constraintsTests;
