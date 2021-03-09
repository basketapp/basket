<template>
    <div style="width: 100%; height: 100%" :id="service.identifier">
        <webview
            autosize
            :key="service.identifier"
            class="innner-view"
            :src="service.url"
            preload="./services/preload.js"
            style="width: 100%; height: 100%"
            :partition="'persist:service-' + service.identifier"
            :useragent="userAgent"
        ></webview>
    </div>
</template>

<script>
    import { shell } from 'electron';
    import { mapActions, mapGetters } from 'vuex';
    import GetWebview from '../../library/webview';
    import notificationHandler from '../../library/ipc/notificationHandler';
    import decideService from '../../services/services';

    export default {
        name: 'ServiceWebview',
        props: {
            service: {
                required: true,
                type: Object,
            },
        },
        computed: {
            userAgent() {
                return window.navigator.userAgent.replace(
                    /(Basket|Electron)([^\s]+\s)/g,
                    '',
                );
            },
        },
        mounted() {
            const webview = GetWebview(this.service.identifier);
            const service = this.service;

            this.$nextTick(() => {
                webview.addEventListener('new-window', (event) => {
                    event.preventDefault();
                    shell.openExternal(event.url);
                });

                webview.addEventListener('ipc-message', (event) => {
                    if (event.channel === 'init') {
                        webview.send('init-recipe', {
                            recipe: decideService(service.url),
                        });
                    }

                    if (event.channel === 'update-icon') {
                        const icon = event.args[0] || null;

                        this.setIcon({
                            identifier: this.service.identifier,
                            icon,
                        });
                    }

                    if (event.channel === 'message-count') {
                        const unreadMessages = event.args[0] || 0;

                        this.setMessageCount({
                            identifier: this.service.identifier,
                            count: unreadMessages,
                        });
                    }

                    if (event.channel === 'notification') {
                        const options = event.args[0].options;
                        options.identifier = this.service.identifier;
                        options.title = event.args[0].title;

                        new notificationHandler( // eslint-disable-line
                            event.args[0].notificationId,
                            options,
                            this.$store,
                        );
                    }
                });

                // Once the dom is ready ensure the sound is muted if
                // the service is muted or all sound is muted.
                webview.addEventListener('dom-ready', async () => {
                    webview.setAudioMuted(
                        !service.soundEnabled || this.getSoundMuted(),
                    );
                });
            });
        },
        methods: {
            ...mapActions('services', ['setMessageCount', 'setIcon']),

            ...mapGetters('settings', [
                'getSoundMuted',
                'getEnabledSearchProviders',
            ]),
        },
    };
</script>
