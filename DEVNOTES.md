#### Developer Notes

###### TODOS

1. Improve documentation
2. Validate config object
3. Support Neo4j version 4.X.X
4. Run all changes in a single transaction
5. Support composite indexes
6. Support Enterprise Edition constraints
	- Node property existence constraint
	- Relationship propertyexistence constraints
	- Node key constraints

###### Determine Neo4j Version
```
CALL dbms.components() 
YIELD versions 
UNWIND versions as version 
RETURN version
```

// Deprecations: https://neo4j.com/docs/cypher-manual/current/deprecations-additions-removals-compatibility/

// Indexes: https://neo4j.com/docs/cypher-manual/4.0/administration/indexes-for-search-performance/

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