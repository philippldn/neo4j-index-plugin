'use strict';

const {isArrayWithSameValues, sortArray, makeUniqueArray} = require('./base');

const isSameUnnamedRecord = (rec1, rec2) =>
	isArrayWithSameValues(rec1.tokenNames, rec2.tokenNames) &&
	isArrayWithSameValues(rec1.properties, rec2.properties) &&
	rec1.type === rec2.type;

const isSameNamedRecord = (rec1, rec2) =>
	rec1.indexName === rec2.indexName &&
	isSameUnnamedRecord(rec1, rec2);

const cleanRecord = (rec) => ({
	...rec,
	tokenNames: sortArray(makeUniqueArray(rec.tokenNames)),
	properties: sortArray(makeUniqueArray(rec.properties))
});

const parseRawRecord = (rawRecord) => ({
	indexName: rawRecord._fields[rawRecord._fieldLookup['indexName']],
	tokenNames: rawRecord._fields[rawRecord._fieldLookup['tokenNames']],
	properties: rawRecord._fields[rawRecord._fieldLookup['properties']],
	type: rawRecord._fields[rawRecord._fieldLookup['type']]
});

const parseRawRecords = (rawRecords) =>
	rawRecords.map((rawRecord) => parseRawRecord(rawRecord))

const removeRecordStr = (record) => {
	if (record.type === 'node_label_property')
		return `DROP INDEX ON :${record.tokenNames[0]}(${record.properties[0]})`;
	else if (record.type === 'node_unique_property')
		return `DROP CONSTRAINT ON (n:${record.tokenNames[0]}) ASSERT (n.${record.properties[0]}) IS UNIQUE`;
	else if (record.type === 'node_fulltext')
		return `CALL db.index.fulltext.drop("${record.indexName}")`;
	return '';
};

const addRecordStr = (record) => {
	if (record.type === 'node_label_property')
		return `CREATE INDEX ON :${record.tokenNames[0]}(${record.properties[0]})`;
	else if (record.type === 'node_unique_property')
		return `CREATE CONSTRAINT ON (n:${record.tokenNames[0]}) ASSERT (n.${record.properties[0]}) IS UNIQUE`;
	else if (record.type === 'node_fulltext')
		return `CALL db.index.fulltext.createNodeIndex('${record.indexName}', ${JSON.stringify(record.tokenNames)}, ${JSON.stringify(record.properties)})`;
	return '';
};

module.exports = {
	isSameNamedRecord,
	isSameUnnamedRecord,
	cleanRecord,
	parseRawRecords,
	removeRecordStr,
	addRecordStr
};
