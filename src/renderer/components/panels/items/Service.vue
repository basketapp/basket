<template>
    <panel :title="activeService.title"> Service edit. </panel>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Panel from '../Panel';

    export default {
        name: 'Service',
        data: () => ({
            title: '',
            titleRules: [(v) => !!v || 'Title is required'],
            url: '',
            urlRules: [(v) => !!v || 'URL is required'],
            notificationsEnabled: '',
            soundEnabled: '',
            enabled: '',
        }),
        mounted() {
            this.setFormValues();
        },
        components: {
            Panel,
        },
        computed: {
            activeService() {
                return this.serviceByIdentifier()(this.activePanelService());
            },

            shouldUpdateIfValuesChanged() {
                return {
                    notificationsEnabled: this.activeService
                        .notificationsEnabled,
                    soundEnabled: this.activeService.soundEnabled,
                    enabled: this.activeService.enabled,
                };
            },
        },
        methods: {
            save() {
                const data = {
                    identifier: this.activePanelService(),
                    title: this.title,
                    url: this.url,
                    notificationsEnabled: this.notificationsEnabled,
                    soundEnabled: this.soundEnabled,
                    enabled: this.enabled,
                };

                this.updateService(data);
            },

            setFormValues() {
                this.title = this.activeService.title;
                this.url = this.activeService.url;
                this.notificationsEnabled = this.activeService.notificationsEnabled;
                this.soundEnabled = this.activeService.soundEnabled;
                this.enabled = this.activeService.enabled;
            },

            ...mapActions('services', ['updateService']),

            ...mapGetters('panels', ['activePanelService']),

            ...mapGetters('services', ['serviceByIdentifier']),
        },
        watch: {
            activeService() {
                this.setFormValues();
            },
            shouldUpdateIfValuesChanged() {
                this.setFormValues();
            },
        },
    };
</script>
