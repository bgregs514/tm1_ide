window.amdRequire.config({ paths: { vs: './node_modules/monaco-editor/min/vs' } });
window.amdRequire(['vs/editor/editor.main'], function () {
	const editor = monaco.editor.create(document.getElementById('container'), {
		value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
		language: 'javascript',
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