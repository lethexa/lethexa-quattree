var assert = require('assert');
var quattree = require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../lib/') + 'quattree.js');



describe('QuatTree', function () {    

    var TestItem = function(x,y) {
      this.getValue = function() {
	return [x,y];
      };
    };


    describe('#ForEachInRange()', function () {
        it('should return one item when in range and subdivision level is 0', function () {
            var resultList = [];
            var tree = new quattree.QuatTree(0,0, 10,10, 0);
            tree.registerItem(new TestItem(4,4));

            tree.forEachInRange(0,0, 5,5, function(item) {
	      resultList.push(item);
	    });

            assert.equal(resultList.length, 1);
        });
    });

    describe('#ForEachInRange()', function () {
        it('should return zero items when out of range and subdivision level is 0', function () {
            var resultList = [];
            var tree = new quattree.QuatTree(0,0, 10,10, 0);
            tree.registerItem(new TestItem(11,11));

            tree.forEachInRange(0,0, 5,5, function(item) {
	      resultList.push(item);
	    });

            assert.equal(resultList.length, 0);
        });
    });

    describe('#ForEachInRange()', function () {
        it('should return one item when in range and subdivision level is 1', function () {
            var resultList = [];
            var tree = new quattree.QuatTree(0,0, 10,10, 1);
            tree.registerItem(new TestItem(5,5));

            tree.forEachInRange(5,5, 10,10, function(item) {
	      resultList.push(item);
	    });

            assert.equal(resultList.length, 1);
        });
    });

    describe('#ForEachInRange()', function () {
        it('should return zero items when out of range and subdivision level is 1', function () {
            var resultList = [];
            var tree = new quattree.QuatTree(0,0, 10,10, 1);
            tree.registerItem(new TestItem(5,5));

            tree.forEachInRange(0,0, 5,5, function(item) {
	      resultList.push(item);
	    });

            assert.equal(resultList.length, 0);
        });
    });

    describe('#ForEachInRange()', function () {
        it('should return one item when in range and subdivision level is 1', function () {
            var resultList = [];
            var tree = new quattree.QuatTree(0,0, 10,10, 1);
            tree.registerItem(new TestItem(4,4));

            tree.forEachInRange(0,0, 5,5, function(item) {
	      resultList.push(item);
	    });

            assert.equal(resultList.length, 1);
        });
    });

    describe('#unregisterItem()', function () {
        it('should return zero items when item added and removed', function () {
            var resultList = [];
	    var item = new TestItem(4,4);
            var tree = new quattree.QuatTree(0,0, 10,10, 1);
            tree.registerItem(item);
            
	    tree.unregisterItem(item);

            tree.forEachInRange(0,0, 10,10, function(item) {
	      resultList.push(item);
	    });
            assert.equal(resultList.length, 0);
        });
    });

});


