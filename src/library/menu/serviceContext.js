import { locale, en, nl } from '../i18n';

const language = locale === 'en' ? en : nl;

class ServiceContext {
    constructor(mainWindow, service) {
        return [
            {
                label: service.title,
                enabled: false,
                accelerator: `CmdOrCtrl+${service.index + 1}`,
            },
            {
                label: language.edit,
                click: () => {
                    mainWindow.webContents.send(
                        'editService',
                        service.identifier,
                    );
                },
                enabled: true,
            },
            {
                type: 'separator',
            },
            {
                label: language.reload,
                click: async () => {
                    mainWindow.webContents.send(
                        'reloadService',
                        service.identifier,
                        service.url,
                    );
                },
                enabled: service.enabled,
            },
            {
                type: 'separator',
            },
            {
                label: service.soundEnabled
                    ? language.sound_disable
                    : language.sound_enable,
                enabled: service.enabled,
                click: () => {
                    mainWindow.webContents.send(
                        'toggleSound',
                        service.identifier,
                        service.soundEnabled,
                    );
                },
            },
            {
                label: service.notificationsEnabled
                    ? language.notifications_disable
                    : language.notifications_enable,
                enabled: service.enabled,
                click: () => {
                    mainWindow.webContents.send(
                        'toggleNotifications',
                        service.identifier,
                    );
                },
            },
            {
                label: service.enabled
                    ? language.service_disable
                    : language.service_enable,
                click: () => {
                    mainWindow.webContents.send(
                        'toggleService',
                        service.identifier,
                    );
                },
            },
            {
                type: 'separator',
            },
            {
                label: language.remove_service,
                enabled: true,
                click: () => {
                    mainWindow.webContents.send(
                        'removeService',
                        service.identifier,
                    );
                },
            },
        ];
    }
}

export default ServiceContext;
