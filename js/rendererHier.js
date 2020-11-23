const {ipcRenderer} = require('electron');

/* Global - use sparingly */
var gSelectedDimension;
var gSelectedHierarchy;
var gSelectedElement;

/* Initial Load */
ipcRenderer.send('get-dimension-list');

/* IPC Messages */
ipcRenderer.on('get-dimension-list', (event, data) => {
	setElements('hierSidebar', 'dimension', data), 0;
});

ipcRenderer.on('get-dimension-hiers', (event, data) => {
	setElements('hierSidebarH', 'hierarchy', data, 0);
});

ipcRenderer.on('get-dimension-els', (event, data) => {
	setElements('hierSidebarE', 'element', data, 1);
});

/* Helper Functions */
function setElements(divID, type, data, bElement)
{
	listDiv = document.querySelector('div[id=' + divID + ']');
	var dimID = '';
	var objData = data.value;
	if (bElement) {
		objData = data.Elements;
	}

	for(var i = 0; i < objData.length; i++) {
		listDiv.insertAdjacentHTML('beforeend', '<div id=' + type + '_' + i + ' class=tm1Element></div>');
		listDiv.insertAdjacentHTML('beforeend', '<hr>');

		elID = document.getElementById(type + '_' + i);
		elID.insertAdjacentHTML('beforeend', '<i class="fas fa-cube"></i>');
		elID.insertAdjacentHTML('beforeend', '<p>' + objData[i].Name + '</p>');

		elID.addEventListener('click', elementClicked);

		/* For elements, allow context menu pop-up */
		if (bElement) {
			elID.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				ipcRenderer.send('get-element-cm');
			});
		}
	};
}

function elementClicked()
{
	// This whole thing is ugly - is there a way to pass by reference?
	if (this.id.search('dimension') != -1) {
		removeClass(gSelectedDimension, 'selectedTM1Element');
		gSelectedDimension = this;

		// Clear lists
		clearDiv('hierSidebarH', 'Hierarchy List');
		gSelectedHierarchy = '';
		clearDiv('hierSidebarE', 'Element List');
		gSelectedElement = '';

		ipcRenderer.send('get-dimension-hiers', getInnerHTML(gSelectedDimension, 1));
	} else if (this.id.search('hierarchy') != -1) {
		removeClass(gSelectedHierarchy, 'selectedTM1Element');
		gSelectedHierarchy = this;

		// Clear list
		clearDiv('hierSidebarE', 'Element List');
		gSelectedElement = '';

		ipcRenderer.send('get-dimension-els', getInnerHTML(gSelectedDimension, 1), getInnerHTML(gSelectedHierarchy, 1));
	}

	this.classList.add('selectedTM1Element');
	setVisibility();
}

function setVisibility()
{
	if (gSelectedDimension) {
		document.getElementById('hierSidebarH').style.visibility = 'visible';
	} else {
		document.getElementById('hierSidebarH').style.visibility = 'hidden';
	}
	if (gSelectedHierarchy) {
		document.getElementById('hierSidebarE').style.visibility = 'visible';
	} else {
		document.getElementById('hierSidebarE').style.visibility = 'hidden';
	}
}

function removeClass(element, className)
{
	if (element) {
		element.classList.remove(className);
	}
}

function getInnerHTML(element, bEncode)
{
	return bEncode ? encodeURIComponent(element.querySelector('div p').innerHTML.trim()) : element.querySelector('div p').innerHTML.trim();
}

/* It's not my favorite, but I couldn't bring myself to loop all elements just to save the first title element */
function clearDiv(divName, title)
{
	document.getElementById(divName).innerHTML = '';
	document.getElementById(divName).insertAdjacentHTML('beforeend', '<ul id=title>' + title + '</ul>');
}