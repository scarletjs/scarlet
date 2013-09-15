var g = require("../../../../include");

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
			g.assert(result.method() == "One");
			g.assert(result.next().method() == "Two");
			g.assert(result.next().next().method() == "Three");
		});

	});

});