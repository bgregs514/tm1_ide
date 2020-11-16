const {app, BrowserWindow, Menu, MenuItem, dialog, net, ipcMain} = require('electron');

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});
	const configWin = new BrowserWindow({
		width: 800,
		height: 600,
		parent: win,
		modal: true,
		show: false
	});

	//win.addListener('resize', resizeEditor);

	win.loadFile('index.html');
	//win.webContents.openDevTools();

	const menuTemplate = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Save',
					click() {
						win.webContents.send('save-cube-rule');
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
						configWin.show();
					}
				}
			]
		},
		{
			label: 'View',
			submenu: [
				{
					role: 'zoomin'
				},
				{
					role: 'zoomout'
				}
			]
		}
	]

	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

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

/* ipcRenderer Messages */

ipcMain.on('get-cube-list', (event, arg) => {
	var jsonObj = '';
	//console.log("I'm in");
	const options = {
		method: 'GET',
		protocol: 'https:',
		hostname: 'usher7873.usdev.deloitte.com',
		port: 45642,
		path: '/api/v1/Cubes?$select=Name',
	};
	const req = net.request(options, res => {
		console.log(`statusCode: ${res.statusCode}`);

		res.on('data', chunk => {
			jsonObj += chunk;
			//console.log(`BODY: ${jsonObject}`);
		});
		res.on('end', () => {
			jsonObj = JSON.parse(jsonObj);
			event.reply('get-cube-list', jsonObj);
		});
	});
	req.setHeader('Content-Type', 'application/json');
	req.on('login', (authInfo, callback) => {
		callback('bengregory', 'Bsg051493@');
	});
	req.on('error', error => { 
		console.log(`ERROR: ${error}`);
	});
	req.end();
});

ipcMain.on('get-cube-rule', (event, arg) => {
	var jsonObj = '';
	//console.log("I'm in");
	const options = {
		method: 'GET',
		protocol: 'https:',
		hostname: 'usher7873.usdev.deloitte.com',
		port: 45642,
		path: '/api/v1/Cubes(\'' + arg + '\')?$select=Rules',
	};
	const req = net.request(options, res => {
		console.log(`statusCode: ${res.statusCode}`);

		res.on('data', chunk => {
			jsonObj += chunk;
			//console.log(`BODY: ${jsonObject}`);
		});
		res.on('end', () => {
			jsonObj = JSON.parse(jsonObj);
			event.reply('get-cube-rule', jsonObj);
		});
	});
	req.setHeader('Content-Type', 'application/json');
	req.on('login', (authInfo, callback) => {
		callback('bengregory', 'Bsg051493@');
	});
	req.on('error', error => { 
		console.log(`ERROR: ${error}`);
	});
	req.end();
});

ipcMain.on('save-cube-rule', (event, cubeName, data) => {
	//console.log("hello");
	var jsonObj = '';
	//console.log("I'm in");
	const options = {
		method: 'PATCH',
		protocol: 'https:',
		hostname: 'usher7873.usdev.deloitte.com',
		port: 45642,
		path: '/api/v1/Cubes(\'' + cubeName + '\')',
	};
	const req = net.request(options, res => {
		console.log(`statusCode: ${res.statusCode}`);

		res.on('data', chunk => {
			jsonObj += chunk;
			//console.log(`BODY: ${jsonObject}`);
		});
		res.on('end', () => {
			jsonObj = JSON.parse(jsonObj);
			event.reply('get-cube-rule', jsonObj);
		});
	});
	req.setHeader('Content-Type', 'application/json');
	req.on('login', (authInfo, callback) => {
		callback('bengregory', 'Bsg051493@');
	});
	req.on('error', error => { 
		console.log(`ERROR: ${error}`);
	});
	req.write(data);
	req.end();
});