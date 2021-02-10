const {app, BrowserWindow, Menu, MenuItem, dialog, net, ipcMain} = require('electron');
const storage = require('electron-storage');

/* Configuration Variables */
var gConfigPath = './configuration.json';
var gConfigData = {
	AdminHost: 'Enter Admin Host',
	HTTPPort: 'Enter HTTP Port',
	Username: 'Enter Username',
	Password: 'Enter Password',
	CAM: 0,
	Namespace: 'Enter Namespace'
};

var gAdminHost = '';
var gPort = '';
var gUser = '';
var gPass = '';
var gCAM = '';
var gNamespace = '';
var gEncodedCreds = '';
/* ----------------------- */

/* Context Menu */
var gCM;
/* ----------------------- */

function createWindow() {
	const winMain = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		}
	});
	const winConfig = new BrowserWindow({
		width: 800,
		height: 600,
		parent: winMain,
		modal: true,
		show: false
	});
	const winHier = new BrowserWindow({
		width: 1000,
		height: 800,
		parent: winMain,
		modal: false,
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

	winMain.loadFile('index.html');
	winHier.loadFile('windows/hierarchies.html');


	/****************************************
	* Debug lines
	*****************************************/
	//winMain.webContents.openDevTools();	//
	//winHier.webContents.openDevTools();	//
	/****************************************/

	/* Prevent child windows from being destroyed on close */
	winConfig.addListener('close', (event) => {
		event.preventDefault();
		winConfig.hide();
	});
	winHier.addListener('close', (event) => {
		event.preventDefault();
		winHier.hide();
	});

	const menuTemplate = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Save',
					click() {
						winMain.webContents.send('save-cube-rule');
					}
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Configuration',
					click() {
						winConfig.show();
					}
				}
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Hierarchies',
					click() {
						winHier.show();
					}
				}
			]
		}
	];

	const cmTemplate = [
		{
			label: 'Delete Element',
			click: () => {
				alert('Are you sure you want to delete this element?');
			}
		},
		{
			type: 'separator'
		}
	];
	gCM = Menu.buildFromTemplate(cmTemplate);

	const mHierTemplate = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Display Settings',
					click() {
						//winHier.show();
						console.log('show menu');
					}
				}
			]
		}
	];
	const mHier = Menu.buildFromTemplate(mHierTemplate);
	winHier.setMenu(mHier);

	const menu = Menu.buildFromTemplate(menuTemplate);
	winMain.setMenu(menu);
}

app.whenReady().then(() => {
	getConfigs();
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
});

// This is bad and needs to be fixed, but the CN is wrong in the dev cert
app.commandLine.appendSwitch('ignore-certificate-errors');

function getConfigs()
{
	storage.isPathExists(gConfigPath, (success) => {
		if (success) {
			storage.get(gConfigPath).then(data => {
				//console.log(data);
				gAdminHost = data.AdminHost;
				gPort = data.HTTPPort;
				gUser = data.Username;
				gPass = data.Password;
				gCAM = data.CAM;
				gNamespace = data.Namespace;

				if (gCAM = 1) {
					gEncodedCreds = 'CAMNamespace ' + Buffer.from(gUser + ':' + gPass + ':' + gNamespace).toString('base64');
                }
			}).catch(err => {
				console.log(err);
			});
		} else {
			console.log('path does not exist.');
			storage.set(gConfigPath, JSON.stringify(gConfigData));
		}
	});
}

/*****************************************
 * ipcRenderer Messages
 ****************************************/

ipcMain.on('get-cube-list', (event, arg) => {
	//path = '/api/v1/Cubes?$select=Name';
	path = '/api/v1/Cubes?$select=Name,Rules';
	tm1Request(event, 'GET', path, '', 'get-cube-list');
});

/* Leaving this for now, we may need it later for a "refresh" event or something */
//ipcMain.on('get-cube-rule', (event, arg) => {
//	path = '/api/v1/Cubes(\'' + arg + '\')?$select=Rules';
//	tm1Request(event, 'GET', path, '', 'get-cube-rule');
//});

ipcMain.on('save-cube-rule', (event, cubeName, data) => {
	path = '/api/v1/Cubes(\'' + cubeName + '\')';
	tm1Request(event, 'PATCH', path, data, 'get-cube-rule');
});

ipcMain.on('get-dimension-list', (event) => {
	path = '/api/v1/Dimensions?$select=Name';
	tm1Request(event, 'GET', path, '', 'get-dimension-list');
});

ipcMain.on('get-dimension-hiers', (event, arg) => {
	path = '/api/v1/Dimensions(\'' + arg + '\')/Hierarchies?$select=Name';
	tm1Request(event, 'GET', path, '', 'get-dimension-hiers');
});

ipcMain.on('get-dimension-els', (event, dimension, hierarchy) => {
	path = '/api/v1/Dimensions(\'' + dimension + '\')/Hierarchies(\'' + hierarchy + '\')?$expand=Elements($select=Name)';
	tm1Request(event, 'GET', path, '', 'get-dimension-els');
});

function tm1Request (event, reqType, strPath, data, strReply)
{
	var jsonObj = '';
	const options = {
		method: reqType,
		protocol: 'https:',
		hostname: gAdminHost,
		port: gPort,
		path: strPath,
	};
	const req = net.request(options, res => {
		console.log(`statusCode: ${res.statusCode}`);

		res.on('data', chunk => {
			jsonObj += chunk;
		});
		res.on('end', () => {
			jsonObj = JSON.parse(jsonObj);
			event.reply(strReply, jsonObj);
		});
	});
	req.setHeader('Content-Type', 'application/json');

	/* Set the proper authorization header for CAM, use Basic authentication if not applicable */
	if (gCAM = 1) {
		req.setHeader('Authorization', gEncodedCreds);
	} else {
		req.on('login', (authInfo, callback) => {
			callback(gUser, gPass);
		});
	}
	req.on('error', error => { 
		console.log(`ERROR: ${error}`);
	});
	if (data) {
		req.write(data);
	}
	req.end();
}

ipcMain.on('get-element-cm', () => {
	gCM.popup();
});