const { BrowserWindow } = require('electron')
const {app} = require('electron')

require('../src/connection')
require('electron-reload')(__dirname)

let window;

//Creacion de ventanas
function createWindow() {

    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            show: false,
        }
    })

    window.loadFile('src/ui/index.html');
    window.maximize();
    window.once('ready-to-show', () => {
        window.show();
      })
}

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);