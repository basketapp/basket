import { app, ipcMain, Menu } from 'electron';
import AppMenu from '../menu/main';
import ServiceContext from '../menu/serviceContext';
import WebviewContext from '../menu/webviewContext';

export default function ipcMainInit(settings, mainWindow) {
    ipcMain.on('app-notification-count', (event, count) => {
        app.badgeCount = count;
    });

    ipcMain.on('bouncybounce', () => {
        // Determine if we'd like the dock icon to bounce
        const shouldBounce = settings.getSync('settings.dockBounce') === true;

        // Only make bouncy bounce when on MacOS
        if (process.platform === 'darwin' && shouldBounce) {
            app.dock.bounce();
        }
    });

    // Redraw menu when neccesary
    ipcMain.on('re-draw-menu', () => {
        setTimeout(() => {
            new AppMenu(mainWindow, settings.getSync('services')); // eslint-disable-line
        }, 100);
    });

    ipcMain.on('show-service-tab-context-menu', (event, service) => {
        Menu.buildFromTemplate(
            new ServiceContext(mainWindow, JSON.parse(service)),
        ).popup();
    });

    ipcMain.on('show-context-menu', (event, actualEvent) => {
        Menu.buildFromTemplate(
            new WebviewContext(settings, actualEvent),
        ).popup();
    });

    ipcMain.on('open-main-window', () => {
        // Make sure the app gets opened
        mainWindow.show();
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
    });
}
