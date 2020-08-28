'use strict';

const parseIndexConfig = (indexes) => ({
	tokenNames: [indexes.tokenName],
	properties: [indexes.property],
	type: 'node_label_property'
});

const parseUniqueConstraintConfig = (constraints) => ({
	tokenNames: [constraints.tokenName],
	properties: [constraints.property],
	type: 'node_unique_property'
});

const parseFulltextIndexConfig = (fulltextIndex) => ({
	...fulltextIndex,
	type: 'node_fulltext'
});

module.exports = {
	parseIndexConfig,
	parseUniqueConstraintConfig,
	parseFulltextIndexConfig
};
