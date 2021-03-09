<template>
    <Tab
        :active="service.visible"
        :disabled="!service.enabled"
        :identifier="service.identifier"
        :icon="icon"
        :click="showService"
        :context-menu="showContextMenu"
        :notification-count="service.notificationCount"
    />
</template>

<script>
    import { ipcRenderer } from 'electron';
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';
    import GetWebview from '../../../library/webview';

    export default {
        name: 'Service',
        components: {
            Tab,
        },
        props: {
            service: {
                required: true,
                type: Object,
            },
        },
        computed: {
            icon() {
                return (
                    this.service.customIcon ||
                    this.service.icon ||
                    './static/icons/basket.svg'
                );
            },
        },
        methods: {
            async showService() {
                if (!this.service.enabled) {
                    return;
                }

                this.hidePanels();
                this.setActive(this.service.identifier);

                const webview = GetWebview(this.service.identifier);

                if (document.activeElement) {
                    document.activeElement.blur();
                }

                webview.focus();
            },

            showContextMenu() {
                ipcRenderer.send(
                    'show-service-tab-context-menu',
                    JSON.stringify(this.service),
                );
            },

            ...mapActions('services', ['setActive']),
            ...mapActions('panels', ['hidePanels']),
        },
    };
</script>
