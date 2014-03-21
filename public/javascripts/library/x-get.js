define("library/x-get", ["lodash", "jquery"], function(_, $) {
	function XGetElement(element) {

		var self = this;
		self.element = element;
		self.namespace = "x-get-";

		var isDefined = function(value) {
			return typeof(value) != "undefined"
		};

		self.markAsVisited = function() {
			$(element).attr(self.namespace + "visited", "yes");
		};

		self.clearVisited = function() {
			$(element).attr(self.namespace + "visited", "no");
		};

		self.wasVisited = function() {
			return $(element).attr(self.namespace + "visited") == "yes";
		};

		self.getUri = function() {
			return $(element).attr(self.namespace + "uri");
		};

		self.getTarget = function() {
			return $(element).attr(self.namespace + "target");
		};

		self.executeGet = function(callback) {
			var uri = self.getUri();
			var target = self.getTarget();
			$.get(uri).done(function(html) {
				if (isDefined(target)) {
					$(target).html("");
					$(target).html(html);
				} else {
					$(element).html("");
					$(element).html(html);
				}
				if (callback)
					callback(self);
			});
		};

		self.click = function(callback) {
			$(element).click(function() {
				if (callback) callback(self);
			});
		};

		self.query = function() {
			return $(element);
		};
	}

	function XGet(selector) {

		var self = this;
		self.namespace = "x-get-";

		self.forEach = function(callback) {
			$(selector).each(function(index, element) {
				var xgetElement = new XGetElement(element);
				if (!xgetElement.wasVisited()) {
					callback(xgetElement);
					xgetElement.markAsVisited();
				}
			});
		};
	}

	return XGet;

});