'use strict';

const {parseRawRecords} = require('../../../src/records');

// 1. Check unique constraints are defined
const one = (neo4j, plugin) => async (done) => {
	console.log('start config.neo4j.unique-constraints 1');
	// CREATE BTREE INDEX
	await neo4j.run(`
		CREATE INDEX
		ON :User(name)
	`);
	await neo4j.run(`
		CREATE CONSTRAINT
		ON (n:User)
		ASSERT (n.id) IS UNIQUE
	`);
	await neo4j.run(`
		CALL db.index.fulltext.createNodeIndex('testing123index', ${JSON.stringify(['User', 'Document'])}, ${JSON.stringify(['name', 'description'])})
	`);

	await plugin(neo4j.getDriver(), {
		indexes: [{
			tokenName: 'User',
			property: 'name'
		}, {
			tokenName: 'User',
			property: 'date'
		}],
		uniqueConstraints: [{
			tokenName: 'Document',
			property: 'id'
		}, {
			tokenName: 'User',
			property: 'id'
		}],
		fulltextIndexes: [{
			indexName: 'exampleIndexName',
			tokenNames: ['User'],
			properties: ['id', 'name', 'description']
		}, {
			indexName: 'secondExampleIndexName',
			tokenNames: ['User', 'Document'],
			properties: ['name']
		}]
	});

	console.log('so far so good')
	
	const res = await neo4j.run(`CALL db.indexes`);

	const parsedRecords = parseRawRecords(res.records);

	console.log(parsedRecords);
	expect(parsedRecords.length).toBe(6);

	console.log('end config.neo4j.unique-constraints 1');
	done();
};

module.exports = one;
