const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;

const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

require('electron-reload')(__dirname);

const Combination = require('./Combination');
const comboData = new Combination();


let mainWindow;

function main() {
    
    mainWindow = new BrowserWindow({width: 1400, height: 920, webPreferences: { nodeIntegration: true }});
    //mainWindow.setMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.once('show', () => {
        mainWindow.send('combos', comboData.getCombos());
    });

}


ipcMain.on('add-combo', (event, combo) => {
    const updatedCombos = comboData.addCombo(combo);
    mainWindow.send('combos', updatedCombos);
  });

  ipcMain.on('delete-combo', (event, combo) => {
    const updatedCombos = comboData.deleteCombo(combo);
    mainWindow.send('combos', updatedCombos);
  });

  ipcMain.on('get-combos', () => {
    mainWindow.send('combos', comboData.getCombos());
  });


app.on('ready', main);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        main();
    }
});