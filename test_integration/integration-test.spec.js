'use strict';

const neo4j = require('./test_config/neo4j');
const integrationTests = require('./integration');


beforeAll(() => neo4j.init());

describe('Integration', () => integrationTests(neo4j));

afterAll(() => neo4j.shutdown());
