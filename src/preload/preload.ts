// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { Channels } from "../channels";

/**
 * Invoke channel
 * @param channel Channel name
 * @param args arguments
 * @returns results (array or undefined)
 */
const invokeChannel = async (channel: Channels, ...args: unknown[]) => {
  try {
    const results = await ipcRenderer.invoke(channel, ...args);
    return results;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Secure IPC communication bridge
 * @see https://www.electronjs.org/ja/docs/latest/api/context-bridge
 */
contextBridge.exposeInMainWorld("bridge", {
  /**
   * Close
   */
  close: async () => {
    await invokeChannel(Channels.Close);
  },

  /**
   * Minimize
   * @returns
   */
  minimize: async () => {
    await invokeChannel(Channels.Minimize);
  },

  /**
   * Set fullscreen mode
   * @params flag true: enable fullscreen, false: disable fullscren
   */
  setFullscreen: async (flag: boolean) => {
    await invokeChannel(Channels.SetFullscreen, flag);
  },
});
