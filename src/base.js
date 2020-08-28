'use strict';

const isArray = (arr) => Array.isArray(arr);
const ifArray = (arr) => isArray(arr) ? arr : [];

const makeUniqueArray = (arr) =>
	arr.filter((val, idx, arr) => arr.indexOf(val) === idx);

const sortArray = (arr) =>
	[...arr].sort();

const makeUniqueSortedArrayOfStrings = (arr) =>
	sortArray(makeUniqueArray(arr));

const isSameArray = (arr1, arr2) =>
	arr1.length === arr2.length &&
	arr1.every((val, idx) => val === arr2[idx]);

const isArrayWithSameStringValues = (arr1, arr2) =>
	isSameArray(makeUniqueSortedArrayOfStrings(arr1), makeUniqueSortedArrayOfStrings(arr2));

const isArrayWithSameValues = (arr1, arr2) =>
	(arr1.every((val) => arr2.includes(val))) &&
	(arr2.every((val) => arr1.includes(val)));

// Example:
// compareFn: (a, b) => a === b;
// array1: [1, 2, 3, 4, 5]
// array2:          [4, 5, 6, 7, 8]
// return: [1, 2, 3]
const getDifference = (compareFn) => (array1, array2) => 
	array1.filter((value1) =>
		!array2.some((value2) => compareFn(value1, value2)));

module.exports = {
	ifArray,
	isArrayWithSameValues,
	sortArray,
	makeUniqueArray,
	getDifference
};
