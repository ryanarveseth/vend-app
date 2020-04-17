const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;

const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

require('electron-reload')(__dirname);

const Combination = require('./Combination');
const comboData = new Combination();

const Grouping = require('./Grouping');
const groupData = new Grouping();


let mainWindow;

function main() {

    mainWindow = new BrowserWindow({width: 1410, height: 920, webPreferences: { nodeIntegration: true }});
    mainWindow.setMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.once('show', () => {

        const combos = comboData.getCombos();
        const groups = groupData.getGroupings();

        mainWindow.send('combos', combos);
        mainWindow.send('groups', groups);
    });

}

ipcMain.on('add-combo', (event, combo) => {
    const updatedCombos = comboData.addCombo(combo);
    mainWindow.send('combos', updatedCombos);
  });

  ipcMain.on('delete-combo', (event, combo) => {
    const updatedCombos = comboData.deleteCombo(combo);

    const updatedGroups = groupData.deleteCombo(combo);

    mainWindow.send('combos', updatedCombos);
    mainWindow.send('groups', updatedGroups);
  });

  ipcMain.on('get-combos', () => {
    const combos = comboData.getCombos();
    mainWindow.send('combos', combos);
  });

  ipcMain.on('set-groupings', (event, groups) => {
    const updatedGroups = groupData.setGroupings(groups);
    mainWindow.send('groups', updatedGroups);
  });

  ipcMain.on('get-groupings', () => {
    const groups = groupData.getGroupings();
    mainWindow.send('groups', groups);
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