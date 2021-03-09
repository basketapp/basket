<template>
    <div class="app">
        <div class="draggable">&nbsp;</div>

        <div class="layout">
            <div class="layout">
                <Sidebar />

                <template v-if="currentActivePanel === 'service'">
                    <Service />
                </template>

                <template v-else-if="currentActivePanel === 'preferences'">
                    <Preferences />
                </template>

                <div class="content">
                    <Webviews />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Sidebar from './Sidebar';
    import Service from './panels/items/Service';
    import Preferences from './panels/items/Preferences';
    import Webviews from './Webviews';
    import ipcRendererInit from '../library/ipc/renderer';

    export default {
        name: 'App',
        components: {
            Service,
            Sidebar,
            Webviews,
            Preferences,
        },
        async created() {
            await this.loadSettings();
            await this.loadServices();

            ipcRendererInit(this.$store);
        },
        computed: {
            currentActivePanel() {
                return this.activePanel();
            },
        },
        methods: {
            ...mapGetters('panels', ['activePanel']),

            ...mapGetters('services', ['getTotalNotificationCount']),

            ...mapActions('settings', ['loadSettings']),

            ...mapActions('services', ['loadServices']),
        },
    };
</script>

<style lang="scss">
    .app {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        background-color: $silver;

        .draggable {
            position: relative;
            top: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
            height: 50px;
            pointer-events: none;
            -webkit-app-region: drag;
        }

        .layout {
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
        }

        .content {
            width: 100%;
            overflow: hidden;
        }
    }
</style>
