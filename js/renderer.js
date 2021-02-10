const { ipcRenderer } = require('electron');
const { Notification } = require('electron').remote;

/* Global - use sparingly */
var g_SelectedCube;
const g_IconCount = 2;

ipcRenderer.send('get-cube-list');

ipcRenderer.on('get-cube-list', (event, arg) => {
	cubeListDiv = document.querySelector('div[id=mainSidebar]');
	var cubeID = '';

	/* Error on null cube list return */
	if (!arg.value) {
		console.log("Cube list is empty!");
		return;
    }
	
	for(var i = 0; i < arg.value.length; i++) {
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

		cubeID.addEventListener('click', cubeClicked);
	};
});

ipcRenderer.on('save-cube-rule', (event, arg) => {
	ruleCode = editor.getValue();

	data = {
		Rules: ruleCode
	};
	data = JSON.stringify(data);

	ipcRenderer.send('save-cube-rule', encodeURIComponent(g_SelectedCube.querySelector('div p').innerHTML.trim()), data);
});

function cubeClicked()
{
	ruleTag = this.querySelector('div span');
	rule = ruleTag.textContent;

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
	titleBar_cubeName = document.querySelector('div[id=titleBar_cubeName]');
	titleBar_cubeName.innerHTML = g_SelectedCube.querySelector('div p').innerHTML.trim();
	titleBar_status.innerHTML = "";

	if (rule == "null") {
		/* Assign the title bar status */
		titleBar_status = document.querySelector('div[id=titleBar_status]');
		titleBar_status.innerHTML = "NEW";

		/* Give the rule a basic header comment */
		rule = "# " + titleBar_cubeName.innerHTML + ".rux";
	}

	/* Assign the rule to the Monaco editor */
	editor.setValue(rule);
}

/*****************************************
 * Message Boxes
 ****************************************/
/* INFO: Null rule */
o_NullRule = {
	title: "No Rule",
	body: "There is no rule available for this cube.  Click here to create one.",
	silent: true
	//icon: __dirname + '\resources\code.png'
};
const n_NullRule = new Notification(o_NullRule);
n_NullRule.on('click', (event) => {
	console.log("notification clicked");
});