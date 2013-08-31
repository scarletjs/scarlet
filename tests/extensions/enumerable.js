require("../../include");

describe("Given we are using an enumerable", function(){

	var ext = require("../../lib/extensions");

	describe("When enumerating an array", function(){

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

	describe("When enumerating function members", function(){

		function Fake(){
			this.apple = 1;
			this.pear = function(){}
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

	describe("When enumerating a string", function(){

		var counter = 0;
		var result = [];
		var instance = "ABC";

		ext.enumerable.forEach(instance, function(character) {
			counter++;
			result.push(character);
		})

		it("Then our callback should execute 3 times", function(){
			assert(counter == 3, "Callback for string was not executed correctly");
		});

		it("Then we should be called with all the array element values", function(){
			assert(result[0] == "A", "Could not find character 'A'");
			assert(result[1] == "B", "Could not find character 'B'");
			assert(result[2] == "C", "Could not find character 'C'");
		});

	});

	describe("When enumerating an object", function(){

		function Fake(){
			this.apple = 1;
			this.pear = function(){}
			this.bananna = null;
		}

		var counter = 0;
		var result = [];
		var instance = new Fake();

		ext.enumerable.allEach(instance, function(val, name, obj) {
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

});