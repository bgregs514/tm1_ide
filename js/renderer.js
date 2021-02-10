const { ipcRenderer } = require('electron');

/*****************************************
 * Globals - Use sparingly
 ****************************************/
var g_SelectedCube;
const g_IconCount = 2;

/*****************************************
 * ipcRenderer Messages
 ****************************************/
ipcRenderer.send('get-cube-list');

ipcRenderer.on('get-cube-list', (event, arg) => {
	/* Disable the loading icon */
	toggleLoadingIcon(false);

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

ipcRenderer.on('refresh-cube-rule', (event, arg) => {
	setRule(arg.Rules);
	setEditor(arg.Rules);

	/* Disable the loading icon */
	toggleLoadingIcon(false);
	/* TODO: This is a hack, see below note for more details */
	document.body.style.pointerEvents = "auto";
	/* Display success notification */
	n_RuleSaveSuccess.show();
});

ipcRenderer.on('save-cube-rule', (event, arg) => {
	toggleLoadingIcon(true);
	/* TODO: This is a lazy hack to disable clicks so the setRule() function doesn't
	 * assign the rule to a different tmeElement's span tag - which does happen if a user
	 * clicks a different tm1Element before the save has completed and the g_SelectedCube variable
	 * has been updated.  The proper approach is to pass the cube name that the save is being performed on to the
	 * setRule() and setEditor() functions instead of relying on g_SelectedCube, but this is a placeholder for now. */
	document.body.style.pointerEvents = "none";

	ruleCode = editor.getValue();

	data = {
		Rules: ruleCode
	};
	data = JSON.stringify(data);

	ipcRenderer.send('save-cube-rule', encodeURIComponent(g_SelectedCube.querySelector('div p').innerHTML.trim()), data);
});

/*****************************************
 * Standard Functions
 ****************************************/
/*
 * Handles the assignment of global variables when a cube is clicked
 */
function cubeClicked()
{
	ruleTag = this.querySelector('div span');
	rule = ruleTag.textContent;

	if (g_SelectedCube) {
		g_SelectedCube.classList.remove('selectedTM1Element');
	}

	this.classList.add('selectedTM1Element');
	g_SelectedCube = this;

	setEditor(rule);
}

/*
 * Sets the title bar elements (Cube Name and Status), and assigns the rule text to
 * the Monaco editor
 */
function setEditor(rule)
{
	/* Set the cube name in the title bar */
	titleBar_cubeName = document.querySelector('div[id=titleBar_cubeName]');
	titleBar_cubeName.innerHTML = g_SelectedCube.querySelector('div p').innerHTML.trim();
	titleBar_status.innerHTML = "";

	/* 3 different possible states that the rule could be in while still being empty...awesome */
	if (rule === "null" || rule === "" || rule === null) {
		/* Remove the rule icon */
		g_SelectedCube.querySelectorAll('i')[1].classList.remove('fas', 'fa-file-code');

		/* Assign the title bar status */
		titleBar_status = document.querySelector('div[id=titleBar_status]');
		titleBar_status.innerHTML = "NEW";

		/* Give the rule a basic header comment */
		rule = "# " + titleBar_cubeName.innerHTML + ".rux";
	} else {
		g_SelectedCube.querySelectorAll('i')[1].classList.add('fas', 'fa-file-code');
    }

	/* Assign the rule to the Monaco editor */
	editor.setValue(rule);
}

/*
 * Assigns the rule text to the hidden tm1Element span for quicker access
 * and reduced network calls
 */
function setRule(rule)
{
	ruleTag = g_SelectedCube.querySelector('div span');
	ruleTag.innerHTML = rule;
}

/*
 * Toggles the visibility of the loading icon
 * display = true -> visible
 * display = false -> hidden
 */
function toggleLoadingIcon(display)
{
	if (display)
		document.getElementById("sideBar_loading").style.display = "inherit";
	else
		document.getElementById("sideBar_loading").style.display = "none";
}