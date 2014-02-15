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
			
			// chrome
			// clouds_midnight
			// kr_theme
			// tomorrow_night
			// 
			self.editor.setTheme("ace/theme/clouds_midnight");
			self.editor.getSession().setMode("ace/mode/javascript");

			self.editor.setReadOnly(false);
			self.editor.setShowPrintMargin(false);
			self.editor.setHighlightActiveLine(true);
			self.editor.getSession().setUseWrapMode(false);
			
			self.editor.commands.addCommand({
			    name: "execute",
			    bindKey: {win: "Ctrl-X",  mac: "Command-X"},
			    exec: function(editor) {
			    	console.log("Run fired");
			    },
			    readOnly: false 
			});
		};
	}
	return Editor;
});