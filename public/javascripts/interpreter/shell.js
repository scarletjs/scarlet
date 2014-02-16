define("interpreter/shell", ["lodash", "scarlet"], function(_, Scarlet) {
	function Shell() {

		var self = this;

		self.execute = function(command) {

			var __outputBuffer = "";

			function print(str){
				__outputBuffer += "# " + new Date().format("hh:mm:ss") + " /: " + str + "<br/>\n";
			}

			try
			{
				eval(command);
			} catch (err) {
				__outputBuffer += err.toString();
			}

			return __outputBuffer;
		};
	}
	return Shell;
});