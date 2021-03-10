import { app, BrowserWindow } from 'electron';
import os from 'os';
import { autoUpdater } from 'electron-updater';
import settings from '../settings';
import AppMenu from './menu/main';
import ipcMainInit from './ipc/main';
import { isDevMode } from '../environment';

let mainWindow: BrowserWindow;
let forceQuit: boolean;

const platform = os.platform();

async function createWindow() {
    const mainWindowStateKeeper = await windowStateKeeper('main');

    // Create the browser window.
    mainWindow = new BrowserWindow({
        titleBarStyle: platform === 'darwin' ? 'hidden' : 'default',
        title: 'Basket',
        x: mainWindowStateKeeper.x,
        y: mainWindowStateKeeper.y,
        width: mainWindowStateKeeper.width,
        height: mainWindowStateKeeper.height,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true // TODO: REMOVE THIS
        },
    });

    // Track window state
    mainWindowStateKeeper.track(mainWindow);

    // and load the app.html of the app.
    await mainWindow.loadFile('app.html');

    if (isDevMode) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', (event) => {
        event.preventDefault();

        if (!forceQuit && platform === 'darwin') {
            mainWindow.hide();
        } else {
            app.exit(0);
        }
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    await createWindow();

    new AppMenu(mainWindow, settings.getSync('services')); // eslint-disable-line no-new

    autoUpdater.checkForUpdatesAndNotify();

    // Listen main ipc messages
    ipcMainInit(settings, mainWindow);
});

app.on('before-quit', () => {
    forceQuit = true;
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    } else {
        mainWindow.show();
    }
});

interface iWindowState {
    isMaximized: boolean,
    x: undefined | number,
    y: undefined | number,
    width: number,
    height: number
}

interface iWindowStateKeeper extends iWindowState {
    track(win: BrowserWindow): void,
}

async function windowStateKeeper(windowName: string): Promise<iWindowStateKeeper> {
    let window: BrowserWindow;
    let windowState: iWindowState;

    windowState = {
        isMaximized: false,
        x: undefined,
        y: undefined,
        width: 960,
        height: 680,
    };

    // Restore from settings
    if (await settings.has(`windowState.${windowName}`)) {
        // @ts-ignore
        windowState = await settings.get(`windowState.${windowName}`);
    }

    function saveState(): void {
        if (!windowState.isMaximized) {
            windowState = {
                ...window.getBounds(),
                isMaximized: false
            };
        }
        windowState.isMaximized = window.isMaximized();
        // @ts-ignore
        settings.set(`windowState.${windowName}`, windowState);
    }

    function track(win: BrowserWindow): void {
        window = win;
        ['resize', 'move', 'close'].forEach((event) => {
            // @ts-ignore
            win.on(event, saveState);
        });
    }

    return {
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        isMaximized: windowState.isMaximized,
        track,
    };
}
