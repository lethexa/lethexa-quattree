This is an implementation of a binary tree in javascript.

Installation
------------

	npm install
	grunt

Usage
-----

	var quattree = require('lethexa-quattree');
	
	var TestItem = function(x,y) {
		this.getValue = function() {
			return [x,y];
		};
	};


	var resultList = [];
	var tree = new quattree.QuatTree(0,0, 10,10, 0);
	tree.registerItem(new TestItem(4,4));

	tree.forEachInRange(0,0, 5,5, function(item) {
		resultList.push(item);
	});

	console.log(resultList);


Contributors
------------

* Lethexa


