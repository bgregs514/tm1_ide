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
		value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
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