const { BrowserWindow } = require('electron')
const { app } = require('electron')

require('../src/connection')
require('electron-reload')(__dirname)

let windo;

//Creacion de ventanas
function createWindow() {

    windo = new BrowserWindow({
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

    windo.loadFile('src/ui/index.html');
    windo.maximize();
    windo.once('ready-to-show', () => {
        windo.show();
    });
}

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);
