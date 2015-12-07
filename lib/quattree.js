/**
 * Implementation of a quat tree.
 * @constructor
 * @param minX {Number} start point x
 * @param minY {Number} start point y
 * @param maxX {Number} end point x
 * @param maxY {Number} end point y 
 * @param level {Number} The depth of the tree
 * @param valueCallback {Function} Callback to get the value from an object.
 */
exports.QuatTree = function(minX,minY, maxX,maxY, level, valueCallback) {
  var items = [];
  this.parent = undefined;
  var topLeft;
  var topRight;
  var botLeft;
  var botRight;

  /**
   * Registers an item in the tree
   * @method registerItem
   * @param item {Object} The item to register
   */
  this.registerItem = function(item) {
    var value = getValueOf(item); 
    var valueX = value[0];
    var valueY = value[1];
    if(level <= 0) {
      if(isValueInTile(valueX, valueY)) {
        items.push(item);
      }
    }
    else {
      var middleX = (minX + maxX) / 2.0;
      var middleY = (minY + maxY) / 2.0; 

      if(valueX >= minX && valueX < middleX && valueY >= middleY && valueY < maxY) {
        topLeft = new exports.QuatTree(minX,middleY, middleX,maxY, level-1, valueCallback);
	topLeft.parent = this;
        topLeft.registerItem(item);
      }
      else if(valueX >= middleX && valueX < maxX && valueY >= middleY && valueY < maxY) {
        topRight = new exports.QuatTree(middleX,middleY, maxX,maxY, level-1, valueCallback);
	topRight.parent = this;
	topRight.registerItem(item);
      }
      else if(valueX >= minX && valueX < middleX && valueY >= minY && valueY < middleY) {
        botLeft = new exports.QuatTree(minX,minY, middleX,middleY, level-1, valueCallback);
	botLeft.parent = this;
	botLeft.registerItem(item);
      }
      else if(valueX >= middleX && valueX < maxX && valueY >= minY && valueY < middleY) {
        botRight = new exports.QuatTree(middleX,minY, maxX,middleY, level-1, valueCallback);
	botRight.parent = this;
	botRight.registerItem(item);
      }
    }
  };

  /**
   * Unregisters an item from the tree
   * @method unregisterItem
   * @param item {Object} The item to unregister
   */
  this.unregisterItem = function(item) {
    if(isLeaf()) {
      var index = items.indexOf(item);
      if(index >= 0) {
	items.splice(index,1);
      }
    }
    else {
      if(topLeft !== undefined)
	topLeft.unregisterItem(item);
      if(topRight !== undefined)
	topRight.unregisterItem(item);
      if(botLeft !== undefined)
	botLeft.unregisterItem(item);
      if(botRight !== undefined)
	botRight.unregisterItem(item);
    }
  };

  /**
   * Returns an array with x,y-values.
   */
  var getValueOf = function(item) {
    if(valueCallback !== undefined) {
      return valueCallback(item);
    }
    else {
      if(item.getValue !== undefined) {
        return item.getValue();
      }
      else {
	throw Error('No getValue- or callback-function specified');
      }
    }
  };

  /**
   * Calls the callback for all items in the range.
   * @method forEachInRange
   * @param leftBorder {Number} The left border
   * @param rightBorder {Number} The right border
   * @param resultCallback {Function} Is called when an item is found
   */
  this.forEachInRange = function(lX,lY, rX,rY, resultCallback) {
    if(isOutOfTile(lX,lY, rX,rY)) {
      return;
    }

    if(isLeaf()) {
      callForEachItem(resultCallback);      
    } 
    else {
      if(topLeft !== undefined)
	topLeft.forEachInRange(lX,lY, rX,rY, resultCallback);
      if(topRight !== undefined)
	topRight.forEachInRange(lX,lY, rX,rY, resultCallback);
      if(botLeft !== undefined)
	botLeft.forEachInRange(lX,lY, rX,rY, resultCallback);
      if(botRight !== undefined)
	botRight.forEachInRange(lX,lY, rX,rY, resultCallback);
    }
  };

  var callForEachItem = function(callback) {
    if(callback !== undefined) {
      items.forEach(callback);
    } 
  };

  var isLeaf = function() {
    return topLeft === undefined && topRight === undefined && 
           botLeft === undefined && botRight === undefined;
  };

  var isOutOfTile = function(lX,lY, rX,rY) {
    return ((lX <= minX) && (rX <= minX)) || 
	   ((lX > maxX) && (rX > maxX)) ||
 
           ((lY <= minY) && (rY <= minY)) || 
	   ((lY > maxY) && (rY > maxY)); 
  };

  var isValueInTile = function(valueX, valueY) {
    return valueX >= minX && valueX < maxX && 
           valueY >= minY && valueY < maxY;
  };
};


