define("views/editor", ["lodash", "ace/ace"], function(_, ace) {
	function Editor(selector, style) {

		var self = this;
		self.editor = null;
		self.executeEventTargets = [];
		self.style = style.getInstance();

		self.addEventListener = function(eventName, target){
			if (eventName == "execute")
				executeEventTargets.push(target);
		};

		self.subscribeEvents = function(){
			self.editor.commands.addCommand({
			    name: "execute",
			    bindKey: {win: "Ctrl-X",  mac: "Command-X"},
			    exec: function(editor) {
			    	var args = {
			    		self: self,
			    		key: "Ctrl-X",
			    		text: self.editor.getValue()
			    	};
			    	_.each(self.executeEventTargets, function(executeTarget){
			    		executeTarget(args);
			    	});
			    },
			    readOnly: false 
			});
		};

		self.renderEditor = function(){
			self.editor = ace.edit("editor");
			self.editor.setTheme("ace/theme/clouds_midnight");
			self.editor.getSession().setMode("ace/mode/javascript");
			self.editor.setReadOnly(false);
			self.editor.setShowPrintMargin(false);
			self.editor.setHighlightActiveLine(true);
			self.editor.getSession().setUseWrapMode(false);
			
		};

		self.render = function() {
			self.style
				.for(selector)
				.addClassDelay("animated fadeIn", 700);

			self.renderEditor();
			self.subscribeEvents();

		};
	}
	return Editor;
});