'use strict';

// 1. Check fulltext indexes are defined
const one = (neo4j, plugin) => async (done) => {
	console.log('start config.neo4j.fulltext-indexes 1');


	console.log('end config.neo4j.fulltext-indexes 1');
	done();
};

module.exports = one;
