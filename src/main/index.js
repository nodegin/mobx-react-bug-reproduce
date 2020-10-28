'use strict'

import { app, ipcMain, Menu, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    vibrancy: 'dark',
    useContentSize: true,
    webPreferences: { nodeIntegration: true },
  })

  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    mainWindow.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Open the DevTools automatically if developing
    if (isDevelopment) {
      mainWindow.webContents.openDevTools({ mode: 'undocked' })

      mainWindow.webContents.on('context-menu', (event, { x, y }) => {
        Menu.buildFromTemplate([
          {
            label: 'Inspect element',
            click() {
              mainWindow.inspectElement(x, y)
            },
          },
        ]).popup(mainWindow)
      })
    }

    // enter fullscreen, we are not setting "fullscreen" property
    // because need to wait for dev tools to shop up
    // note: only enable in production for easier development
    if (!isDevelopment) {
      mainWindow.setFullScreen(true);
    }
  })

  mainWindow.on('error', (error) => {
    console.error({ error })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('openDevToolsAh', () => {
    mainWindow.webContents.openDevTools({ mode: 'undocked' })
  })
}

// create main BrowserWindow when electron is ready
app.on('ready', createMainWindow)

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!mainWindow) {
    createMainWindow()
  }
})

if (module.hot) {
  module.hot.accept()
}
