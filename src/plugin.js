'use strict';

const {parseRawRecords, isSameUnnamedRecord, isSameNamedRecord, addRecordStr, removeRecordStr} = require('./records');
const {getDifference, ifArray} = require('./base');
const {parseFulltextIndexConfig, parseIndexConfig, parseUniqueConstraintConfig} = require('./config');


const read = (driver) => (query, variables) => {
	const session = driver.session();
	return session.readTransaction((tx) => tx.run(query, variables))
		.finally(() => session.close());
};

const write = (driver) => (query, variables) => {
	const session = driver.session();
	return session.writeTransaction((tx) => tx.run(query, variables))
		.finally(() => session.close());
}


const plugin = async (driver, config = {}) => {
	try {
		const indexesResponse = await read(driver)(`CALL db.indexes`);
		const parsedIndexRecords = parseRawRecords(indexesResponse.records);
		const namedIndexRecords = parsedIndexRecords.filter((record) => record.type === 'node_fulltext');
		const unnamedIndexRecords = parsedIndexRecords.filter((record) => ['node_label_property', 'node_unique_property'].includes(record.type));
		const namedConfigRecords = ifArray(config.fulltextIndexes).map((record) => parseFulltextIndexConfig(record));
		const unnamedConfigRecords = [
			...ifArray(config.indexes).map((record) => parseIndexConfig(record)),
			...ifArray(config.uniqueConstraints).map((record) => parseUniqueConstraintConfig(record))
		];
		const toRemove = [
			...getDifference(isSameNamedRecord)(namedIndexRecords, namedConfigRecords),
			...getDifference(isSameUnnamedRecord)(unnamedIndexRecords, unnamedConfigRecords)
		];
		const toAdd = [
			...getDifference(isSameNamedRecord)(namedConfigRecords, namedIndexRecords),
			...getDifference(isSameUnnamedRecord)(unnamedConfigRecords, unnamedIndexRecords)
		];
		const toRemoveStrings = toRemove.map((record) => removeRecordStr(record)).filter((str) => !!str);
		const toAddStrings = toAdd.map((record) => addRecordStr(record)).filter((str) => !!str);
		console.log({toRemoveStrings, toAddStrings})
		await Promise.all(toRemoveStrings.map((string) => write(driver)(string)))
		await Promise.all(toAddStrings.map((string) => write(driver)(string)))
		return;
	} catch (err) {
		console.log({err})
	}
};

module.exports = plugin;
