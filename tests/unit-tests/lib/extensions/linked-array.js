require("../../../../include");

describe("Given lib/extensions/LinkedArray", function() {

	var ext = require("../../../../lib/extensions");

	describe("When #build(array)", function() {

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