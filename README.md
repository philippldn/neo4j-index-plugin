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


### Developer Notes
###### Neo4j 3.X.X
```
// LIST ALL INDEXES IN THE DATABASE
CALL db.indexes

// LIST ALL CONSTRAINTS IN THE DATABASE
CALL db.constraints


// CREATE A NEW UNNAMED BTREE INDEX
CREATE INDEX ON :LabelName(propertyName)

// DROP AN UNNAMED BTREE INDEX
DROP INDEX ON :LabelName(propertyName)


// CREATE A UNNAMED CONSTRAINT
CREATE CONSTRAINT
ON (n:Label)
ASSERT (n.prop) IS UNIQUE

// DROP AN UNNAMED CONSTRAINT
DROP CONSTRAINT
ON (n:Label)
ASSERT (n.prop) IS UNIQUE


// CREATE A FULLTEXT INDEX
CALL db.index.fulltext.createNodeIndex('${indexName}', ${JSON.stringify(i.tokenNames)}, ${JSON.stringify(i.properties)})

// DROP A FULLTEXT INDEX
CALL db.index.fulltext.drop("${i.indexName}")
```

###### Neo4j 4.X.X
```
// CREATE A NEW INDEX
CREATE INDEX [index_name]
FOR (n:LabelName)
ON (n.propertyName)

// DROP AN INDEX BY NAME
DROP INDEX index_name

// CREATE A NEW UNIQUE CONSTRAINT
CREATE CONSTRAINT [constraint_name]
ON (x:LabelName)
ASSERT x.propertyName IS UNIQUE

// DROP A CONSTRAINT WITHOUT NAME
DROP CONSTRAINT
ON (n:LabelName)
ASSERT n.propertyName IS UNIQUE

// DROP A CONSTRAINT BY NAME
DROP CONSTRAINT constraint_name

// CREATE A FULLTEXT INDEX
CALL db.index.fulltext.createNodeIndex('${indexName}', ${JSON.stringify(i.tokenNames)}, ${JSON.stringify(i.properties)})

// DROP A FULLTEXT INDEX
CALL db.index.fulltext.drop("${i.indexName}")
```