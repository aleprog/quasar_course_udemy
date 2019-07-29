import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { menuTemplate } from './electron-main-menu-template'
/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

export let mainWindow
const menu = Menu.buildFromTemplate(menuTemplate)

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Vedi il metodo qui qui: src\layouts\Layout.vue
// Da notare che
// - devo usare l'oggetto ipcMain per attaccare il listenere
// ma
// - devo comunque usare app per il quit
ipcMain.on('quit-app', () => {
  app.quit()
})
