define("interpreter/shell", ["lodash"], function(_) {
	function Shell() {

		var self = this;

		self.execute = function(command) {
			console.log(command);
		};
	}
	return Shell;
});