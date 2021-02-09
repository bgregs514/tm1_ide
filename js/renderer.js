const {app, dialog, net, ipcRenderer} = require('electron');

/* Global - use sparingly */
var g_SelectedCube;

ipcRenderer.send('get-cube-list');

ipcRenderer.on('get-cube-list', (event, arg) => {
	//console.log("got it");
	console.log(arg);
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
		//console.log(arg.value[i].Name);
		cubeID = document.getElementById('cube_' + i);
		//for (i = 0; i < 2; i++)
		//	cubeID.insertAdjacentHTML('beforeend', '<i></i>');
		cubeID.insertAdjacentHTML('beforeend', '<i class="fas fa-cube"></i>');
		cubeID.insertAdjacentHTML('beforeend', '<i class="fas fa-file-code"></i>');
		if (!arg.value[i].Rules)
			document.querySelectorAll('div[id=cube_' + i + '] > i')[1].style.visibility = 'hidden';
		cubeID.insertAdjacentHTML('beforeend', '<p>' + arg.value[i].Name + '</p>');
		cubeID.insertAdjacentHTML('beforeend', '<span style="display:none;">' + arg.value[i].Rules + '</span>');
		//console.log(cubeID);
		cubeID.addEventListener('click', cubeClicked);
	};
});

//ipcRenderer.on('get-cube-rule', (event, arg) => {
//	//console.log(arg.Rules);

//	/* Error on null rule return */
//	if (!arg.Rules) {
//		console.log("Rule does not exist!");
//		return;
//	}

//	document.querySelector('div[id=cubeName]').innerHTML = g_SelectedCube.querySelector('div p').innerHTML.trim();
//	editor.setValue(arg.Rules);
//});

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
	//console.log('clicked: ' + this.querySelector['div p'].innerHTML);
	//console.log('clicked: ' + this.querySelector('div p').innerHTML);
	//removeClassFromAll('cubeElement', 'selectedCubeElement');

	//ipcRenderer.send('get-cube-rule', encodeURIComponent(this.querySelector('div p').innerHTML.trim()));

	rule = this.querySelector('div span').innerHTML;
	//console.log(rule);
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