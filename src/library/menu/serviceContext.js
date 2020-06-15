import i18n from '@/library/lang';
import AppMenu from '@/library/menu/main';
import GetWebview from '@/library/webview';

class ContextMenu {
    constructor(store, service) {
        return [
            {
                label: service.title,
                accelerator: `CmdOrCtrl+${service.index + 1}`,
            },
            {
                type: 'separator',
            },
            {
                label: i18n.t('reload'),
                click: () => {
                    const webview = GetWebview(service.identifier);
                    webview.loadURL(service.url);
                },
                enabled: service.enabled,
            },
            {
                type: 'separator',
            },
            {
                label: service.soundEnabled
                    ? i18n.t('sound_disable')
                    : i18n.t('sound_enable'),
                click: () => {
                    store.dispatch('services/toggleSound', service.identifier);
                },
            },
            {
                label: service.notificationsEnabled
                    ? i18n.t('notifications_disable')
                    : i18n.t('notifications_enable'),
                click: () => {
                    store.dispatch(
                        'services/toggleNotifications',
                        service.identifier,
                    );
                },
            },
            {
                label: service.enabled
                    ? i18n.t('service_disable')
                    : i18n.t('service_enable'),
                click: () => {
                    store.dispatch(
                        'services/toggleService',
                        service.identifier,
                    );

                    new AppMenu(store); // eslint-disable-line no-new
                },
            },
            {
                type: 'separator',
            },
            {
                label: i18n.t('remove_service'),
                enabled: true,
                click: () => {
                    if (
                        // eslint-disable-next-line no-alert
                        window.confirm(i18n.t('confirm_delete_service'))
                    ) {
                        store.dispatch(
                            'services/removeService',
                            service.identifier,
                        );

                        new AppMenu(store); // eslint-disable-line no-new
                    }
                },
            },
        ];
    }
}

export default ContextMenu;
