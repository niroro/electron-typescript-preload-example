/**
 * Bridge interface for preload.ts
 */
export interface IBridge {
  close: () => Promise<void>
  minimize: () => Promise<void>
  setFullscreen: (flag: boolean) => Promise<void>
}

/**
 * 'windows' additional interface
 */
interface IBridgedWindow {
  bridge: IBridge
}

/**
 * bridge
 */
export const Bridge: IBridge = (window as unknown as IBridgedWindow).bridge
