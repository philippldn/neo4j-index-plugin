'use strict';

const neo4j = require('./neo4j');

beforeAll(() => neo4j.init()
	.then(() => neo4j.write('CREATE (n:Test {str: "hello world"}) RETURN n')));

afterAll(() => neo4j.write('MATCH (n) DETACH DELETE n')
	.then(() => neo4j.shutdown()));

test.skip('tests neo4j write and read', () => {
	return neo4j.read('MATCH (n) RETURN n.str')
		.then((data) => {
			expect(data[0]).toBe('hello world');
		});
});
