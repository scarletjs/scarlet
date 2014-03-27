define("interpreter/shell", ["lodash", "jquery", "scarlet", "library/x-get"], function(_, $, Scarlet, XGet) {
	function Shell() {

		var self = this;

		self.execute = function(command) {

			var __outputBuffer = "";

			function print(str){
				__outputBuffer += "<span style='color: #3C403B'>[" + new Date().format("hh:mm:ss") + "]</span>: " + str + "<br/>\n";
			}

			var traceInterceptor = function(info, method, args){
			  var result = method.call(this, info, method, args);
			  var query = scarlet.interceptQuery(info, method, args, result);
			  query.traceTo(print);
			  return result;
			};

			try
			{
				new XGet("div[x-shell-addref]", "shell-addref-visited")
					.forEach(function(xgetElement) {
						var $element = $(xgetElement.element);
						var refs = $element.html();
						$element.attr("x-shell-ref-live", refs);
						console.log("XShell::execute adding permanent reference to {0} for page lifecycle".format($element.html()))
					});
				var refs = $("[x-shell-ref-live]").html();
				var code = refs + ";" + command;
				console.log("XShell::executing code {0}".format(code))
				eval(code);
			} catch (err) {
				__outputBuffer += err.toString();
			}

			return __outputBuffer;
		};
	}
	return Shell;
});
