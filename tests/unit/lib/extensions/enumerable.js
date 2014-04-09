var assert = require("assert");

describe("Given lib/extensions/Enumerable", function(){

	var ext = require("../../../../lib/extensions");

	describe("When #forEach() with arrays", function(){

		var counter = 0;
		var result = [];
		var arr = ["apple", "pear", "bananna"];

		ext.enumerable.forEach(arr, function(element){
			counter++;
			result.push(element);
		});

		it("Then our callback should execute 3 times", function(){
			assert(counter == 3, "Callback for array was not executed correctly");
		});

		it("Then we should be called with all the array element values", function(){
			assert(result[0] == "apple", "Could not find array element 'apple'");
			assert(result[1] == "pear", "Could not find array element 'pear'");
			assert(result[2] == "bananna", "Could not find array element 'bananna'");
		});

	});

	describe("When #forEach() with objects", function(){

		function Fake(){
			this.apple = 1;
			this.pear = function(){};
			this.bananna = null;
		}

		var result = [];
		var counter = 0;
		var instance = new Fake();

		ext.enumerable.forEach(instance, function(val, name, obj) {
			counter++;
			result.push(name);
		});

		it("Then our callback should execute 3 times", function(){
			assert(counter == 3, "Callback for function was not executed correctly");
		});

		it("Then we should be called with all the array element values", function(){
			assert(result[0] == "apple", "Could not find array element 'apple'");
			assert(result[1] == "pear", "Could not find array element 'pear'");
			assert(result[2] == "bananna", "Could not find array element 'bananna'");
		});

	});

	describe("When #forEach() with strings", function(){

		var counter = 0;
		var result = [];
		var instance = "ABC";

		ext.enumerable.forEach(instance, function(character) {
			counter++;
			result.push(character);
		});

		it("Then our callback should execute 3 times", function(){
			assert(counter == 3, "Callback for string was not executed correctly");
		});

		it("Then we should be called with all the array element values", function(){
			assert(result[0] == "A", "Could not find character 'A'");
			assert(result[1] == "B", "Could not find character 'B'");
			assert(result[2] == "C", "Could not find character 'C'");
		});

	});
	describe("When #mapSeries() ", function(){
		var didCallResult = false;
		var didCallFunction1 = false;
		var didCallFunction2 = false;

		beforeEach(function(){
			var f1 = function(callback){ 
				didCallFunction1 = true; 
				callback();
			};

			var f2 = function(callback){
				didCallFunction2 =true;
				callback();
			};

			ext.enumerable.mapSeries([f1,f2],function(error,func,callback){
				func(callback);
			},function(){
				didCallResult = true;
			});		
		});
		
		it("Then last function should be undefined",function(){
			assert(didCallResult === true);
		});
		it("Then should call for each function",function(){
			assert(didCallFunction1 === true);
			assert(didCallFunction1 === true);
		});
	});

});