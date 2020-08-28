'use strict';

const plugin = require('../../index');
const btreeIndexTests = require('./btree-index');
const constraintsTests = require('./constraints');
const fulltextIndexTests = require('./fulltext-index');

const integrationTests = (neo4j) => {
	beforeEach(async () => {
		await neo4j.run('MATCH (n) DETACH DELETE n');
		console.log('DB deleted!');
	});

	describe('Btree Index', () => btreeIndexTests(neo4j, plugin));
	describe('Constraints', () => constraintsTests(neo4j, plugin));
	describe('Fulltext Index', () => fulltextIndexTests(neo4j, plugin));
};

module.exports = integrationTests;
