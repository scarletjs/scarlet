define("views/editor", ["ace/ace"], function(ace) {
	function Editor(selector, style) {

		var self = this;
		self.editor = null;
		self.style = style.getInstance();

		self.render = function() {
			self.style
				.for(selector)
				.addClassDelay("animated fadeIn", 700);

			self.editor = ace.edit("editor");
			self.editor.setTheme("ace/theme/monokai");
			self.editor.getSession().setMode("ace/mode/javascript");
		};
	}
	return Editor;
});