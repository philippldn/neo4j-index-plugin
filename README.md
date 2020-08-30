# Neo4j-Index-Plugin

A small, zero dependencies plugin for the neo4j driver (Neo4j version 3.X.X) to help with setting up (or updating if necessary) indexes (btree), fulltext indexes and constraints (unique).

This plugin will only create / update indexes that are not already in the database

## Install

```sh
npm install --save neo4j-index-plugin
```

## Setup
```js
const neo4j = require('neo4j-driver');
const neo4jIndexPlugin = require('neo4j-index-plugin');

const driver = await neo4j.driver(url, neo4j.auth.basic(user, password));

await neo4jIndexPlugin(driver, {
	indexes: [...],
	uniqueConstraints: [...],
	fulltextIndexes: [...]
});
```

## Config
```js
const config = {
	indexes: [{
		tokenName: 'Document',
		property: 'name'
	}, {
		tokenName: 'User',
		property: 'name'
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
};
```
