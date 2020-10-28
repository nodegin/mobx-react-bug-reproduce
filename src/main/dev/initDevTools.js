export default function initDevTools(window) {
  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })
  window.webContents.on('did-frame-finish-load', () => {
    window.webContents.openDevTools()
  })
}
