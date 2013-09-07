require("../../include");

describe("Given we are using a linked array", function() {

	var ext = require("../../lib/extensions");

	describe("When building linked arrays from callbacks", function() {

		var elementArray = [{
			method: function() {
				return "One";
			}
		}, {
			method: function() {
				return "Two";
			}
		}, {
			method: function() {
				return "Three";
			}
		}];

		it("Then it should build the linked array correctly", function() {

			var result = ext.linkedArray.build(elementArray);
			assert(result.method() == "One");
			assert(result.next().method() == "Two");
			assert(result.next().next().method() == "Three");

		});

	});

});