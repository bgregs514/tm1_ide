const {app, dialog, net, ipcRenderer} = require('electron');

/* Global - use sparingly */
var glbSelectedCube;

ipcRenderer.send('get-cube-list');

ipcRenderer.on('get-cube-list', (event, arg) => {
	//console.log("got it");
	cubeListDiv = document.querySelector('div[id=mainSidebar]');
	var cubeID = '';
	for(var i = 0; i < arg.value.length; i++) {
		//console.log(arg.value[i].Name);
		cubeListDiv.insertAdjacentHTML('beforeend', '<div id=cube_' + i + ' class=tm1Element></div>');
		cubeListDiv.insertAdjacentHTML('beforeend', '<hr>');
		//console.log(arg.value[i].Name);
		cubeID = document.getElementById('cube_' + i);
		//cubeID.insertAdjacentHTML('beforeend', '<img src="./resources/cube.jpg">');
		cubeID.insertAdjacentHTML('beforeend', '<i class="fas fa-cube"></i>');
		cubeID.insertAdjacentHTML('beforeend', '<p>' + arg.value[i].Name + '</p>');
		//console.log(cubeID);
		cubeID.addEventListener('click', cubeClicked);
	};
});

ipcRenderer.on('get-cube-rule', (event, arg) => {
	//console.log(arg.Rules);
	editor.setValue(arg.Rules);
});

ipcRenderer.on('save-cube-rule', (event, arg) => {
	ruleCode = editor.getValue();

	data = {
		Rules: ruleCode
	};
	data = JSON.stringify(data);
	//console.log(data);
	ipcRenderer.send('save-cube-rule', encodeURIComponent(glbSelectedCube.querySelector('div p').innerHTML.trim()), data);
});

function cubeClicked()
{
	//console.log('clicked: ' + this.querySelector['div p'].innerHTML);
	//console.log('clicked: ' + this.querySelector('div p').innerHTML);
	//removeClassFromAll('cubeElement', 'selectedCubeElement');
	if (glbSelectedCube) {
		glbSelectedCube.classList.remove('selectedTM1Element');
	}

	this.classList.add('selectedTM1Element');
	glbSelectedCube = this;

	ipcRenderer.send('get-cube-rule', encodeURIComponent(glbSelectedCube.querySelector('div p').innerHTML.trim()));
}