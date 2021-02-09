const {app, dialog, net, ipcRenderer} = require('electron');

/* Global - use sparingly */
var g_SelectedCube;
const g_IconCount = 2;

ipcRenderer.send('get-cube-list');

ipcRenderer.on('get-cube-list', (event, arg) => {
	//console.log("got it");
	//console.log(arg);
	cubeListDiv = document.querySelector('div[id=mainSidebar]');
	var cubeID = '';

	/* Error on null cube list return */
	if (!arg.value) {
		console.log("Cube list is empty!");
		return;
    }
	
	for(var i = 0; i < arg.value.length; i++) {
		//console.log(arg.value[i].Name);
		cubeListDiv.insertAdjacentHTML('beforeend', '<div id=cube_' + i + ' class=tm1Element></div>');
		cubeListDiv.insertAdjacentHTML('beforeend', '<hr>');

		/* Add all tags to the new tm1Element objects */
		cubeID = document.getElementById('cube_' + i);
		/* Add all available icon slots for spacing */
		for (var j = 0; j < g_IconCount; j++) {
			cubeID.insertAdjacentHTML('beforeend', '<i></i>');
		}
		cubeID.insertAdjacentHTML('beforeend', '<p>' + arg.value[i].Name + '</p>');
		cubeID.insertAdjacentHTML('beforeend', '<span style="display:none;">' + arg.value[i].Rules + '</span>');

		/* Assign icons; only add code file icon if rule is present */
		document.querySelectorAll('div[id=cube_' + i + '] > i')[0].classList.add('fas', 'fa-cube');
		if (arg.value[i].Rules)
			document.querySelectorAll('div[id=cube_' + i + '] > i')[1].classList.add('fas', 'fa-file-code');

		//console.log(cubeID);
		cubeID.addEventListener('click', cubeClicked);
	};
});

ipcRenderer.on('save-cube-rule', (event, arg) => {
	ruleCode = editor.getValue();

	data = {
		Rules: ruleCode
	};
	data = JSON.stringify(data);
	//console.log(data);
	ipcRenderer.send('save-cube-rule', encodeURIComponent(g_SelectedCube.querySelector('div p').innerHTML.trim()), data);
});

function cubeClicked()
{
	ruleTag = this.querySelector('div span');
	rule = ruleTag.textContent;
	if (rule == "null")
		return;

	if (g_SelectedCube) {
		g_SelectedCube.classList.remove('selectedTM1Element');
	}

	this.classList.add('selectedTM1Element');
	g_SelectedCube = this;

	setRule(rule);
}

function setRule(rule)
{
	/* Set the cube name in the title bar */
	document.querySelector('div[id=cubeName]').innerHTML = g_SelectedCube.querySelector('div p').innerHTML.trim();
	/* Assign the rule to the Monaco editor */
	editor.setValue(rule);
}