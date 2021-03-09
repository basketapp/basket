import Electron from 'electron';
import GetWebview from '../webview';
import { locale, en, nl } from '../i18n';

const language = locale === 'en' ? en : nl;

export default function ipcRendererInit(store) {
    function getActiveWebView() {
        return GetWebview(store.getters['services/activeService'].identifier);
    }

    // Check and update AppIcon notification count
    // every 3 seconds
    setInterval(() => {
        Electron.ipcRenderer.send(
            'app-notification-count',
            store.getters['services/getTotalNotificationCount'],
        );
    }, 3000);

    Electron.ipcRenderer.on('openPreferencesPanel', () => {
        store.dispatch('panels/togglePreferencesPanel');

        if (document.activeElement) {
            document.activeElement.blur();
        }
    });

    Electron.ipcRenderer.on('openServiceDeveloperTools', () => {
        getActiveWebView().openDevTools();
    });

    Electron.ipcRenderer.on('resetZoomLevel', () => {
        getActiveWebView().setZoomLevel(0);
    });

    Electron.ipcRenderer.on('addZoomLevel', () => {
        const webview = getActiveWebView();

        webview.setZoomLevel(webview.getZoomLevel() + 1);
    });

    Electron.ipcRenderer.on('substractZoomLevel', () => {
        const webview = getActiveWebView();

        webview.setZoomLevel(webview.getZoomLevel() - 1);
    });

    Electron.ipcRenderer.on('changeService', (event, identifier) => {
        store.dispatch('services/setActive', identifier);

        const webview = GetWebview(
            store.getters['services/activeService'].identifier,
        );

        if (document.activeElement) {
            document.activeElement.blur();
        }

        webview.focus();
    });

    Electron.ipcRenderer.on('editService', (event, identifier) => {
        store.dispatch('panels/showServicePanel', identifier);
    });

    Electron.ipcRenderer.on('reloadService', (event, identifier, url) => {
        const webview = GetWebview(identifier);
        webview.loadURL(url);
    });

    Electron.ipcRenderer.on('toggleNotifications', (event, identifier) => {
        store.dispatch('services/toggleNotifications', identifier);
    });

    Electron.ipcRenderer.on(
        'toggleSound',
        (event, identifier, soundEnabled) => {
            store.dispatch('services/toggleSound', identifier);

            const webview = GetWebview(identifier);
            const allSoundMuted = store.getters['settings/getSoundMuted'];

            // When toggling sound on a service ensure the sound is muted if
            // the service is muted or all sound is muted.
            webview.setAudioMuted(!soundEnabled || allSoundMuted);
        },
    );

    Electron.ipcRenderer.on('toggleService', async (event, identifier) => {
        await store.dispatch('services/toggleService', identifier);

        Electron.ipcRenderer.send('re-draw-menu');
    });

    Electron.ipcRenderer.on('removeService', async (event, identifier) => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm(language.confirm_delete_service)
        ) {
            if (store.getters['panels/activePanelService'] === identifier) {
                await store.dispatch('panels/hidePanels');
            }

            await store.dispatch('services/removeService', identifier);

            Electron.ipcRenderer.send('re-draw-menu');
        }
    });
}
