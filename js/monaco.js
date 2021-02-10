const langRule = require('./js/langRule');
var editor;

window.amdRequire.config({ paths: { vs: './node_modules/monaco-editor/min/vs' } });
window.amdRequire(['vs/editor/editor.main'], function () {
	monaco.languages.register({id: 'langRule'});
	monaco.languages.setMonarchTokensProvider('langRule', langRule);

	// This needs to be in a function to work correctly
	function createSuggestions() {
		return compRule = require('./js/compRule')(monaco);
	}
	monaco.languages.registerCompletionItemProvider('langRule', {
		provideCompletionItems: () => {
			return {suggestions: createSuggestions()};
		},
		triggerCharacters:['.']
	});

	editor = monaco.editor.create(document.getElementById('mainContainer'), {
		value: ['# Welcome to TM1 Code',
				'# <== Select a cube on the left to start hacking\n\n',
				'# To report any issues, please reach out to bgregs on the TM1Forum or submit a bug report on the github page',
				'# Thank you for supporting the project, proudly made in Austin, TX'].join('\n'),
		language: 'langRule',
		scrollBeyondLastLine: false,
		wordWrap: 'on',
		wrappingStrategy: 'advanced',
		overviewRulerLanes: 0
	});
	
	monaco.editor.setTheme('vs-dark');
	window.addEventListener('resize', resizeMonaco);
	
	function resizeMonaco() {
		editor.layout();
	}
});