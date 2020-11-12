const {app, BrowserWindow, Menu, MenuItem, dialog} = require('electron');

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.addListener('resize', resizeEditor);

	win.loadFile('index.html');
	//win.webContents.openDevTools()

	const menuTemplate = [
		{
			label: 'Edit',
			submenu: [
				{
					role: 'undo'
				},
				{
					role: 'redo'
				},
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
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

	const menu = Menu.buildFromTemplate(menuTemplate)
	Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

function resizeEditor() {
	dialog.showMessageBox({
		type: 'info',
		message: 'hello'
	})
}