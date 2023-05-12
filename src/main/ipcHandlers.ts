import { BrowserWindow, IpcMain, IpcMainInvokeEvent } from 'electron'
import { Channels } from '../channels'

/** Browser instance */
let mainWindow: BrowserWindow

/**
 * Ipc handler class
 */
export default class IpcHandler {
  /**
   * constructor
   * @param window browser window
   */
  constructor(window: BrowserWindow) {
    mainWindow = window
  }

  /**
   * Close
   */
  async close() {
    mainWindow.close()
  }

  /**
   * Minimize
   */
  async minimize() {
    mainWindow.minimize()
  }

  /**
   * Set fullscreen
   * @param _event event
   * @param flag true: enable fullscreen, false: disable fullscren
   */
  async setFullscreen(_event: IpcMainInvokeEvent, flag: boolean) {
    mainWindow.setFullScreen(flag)
  }

  /**
   * Add handlers
   * @param ipcMain ipcMain
   */
  addHandlers(ipcMain: IpcMain) {
    // Remove previous handler
    this.removeHandlers(ipcMain)
    
    ipcMain.handle(Channels.Close, this.close.bind(this))
    ipcMain.handle(Channels.Minimize, this.minimize.bind(this))
    ipcMain.handle(Channels.SetFullscreen, this.setFullscreen.bind(this))
  }

  /**
   * Remove handlers
   * @param ipcMain ipcMain
   */
  removeHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(Channels.Close)
    ipcMain.removeHandler(Channels.Minimize)
    ipcMain.removeHandler(Channels.SetFullscreen)
  }
}
