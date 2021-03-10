<template>
    <panel :title="$t('preferences')">Preferences</panel>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Panel from '../Panel';

    export default {
        name: 'Preferences',
        data() {
            return {
                startWithOs: false,
                notificationsMuted: true,
                soundMuted: true,
                dockBounce: true,
                selectedSearchProvider: [],
                searchProviders: ['google', 'bing', 'duckduckgo'],
                selectedLanguage: '',
                languages: [
                    { key: 'en', value: this.$t('language.en') },
                    { key: 'nl', value: this.$t('language.nl') },
                ],
            };
        },
        components: {
            Panel,
        },
        mounted() {
            this.setFormValues();
        },
        computed: {
            shouldUpdateIfValuesChanged() {
                return {
                    notificationsMuted: this.getNotificationsMuted(),
                    soundMuted: this.getSoundMuted(),
                };
            },
        },
        methods: {
            setFormValues() {
                this.notificationsMuted = this.getNotificationsMuted();
                this.soundMuted = this.getSoundMuted();
                this.dockBounce = this.getDockBounce();
                this.selectedLanguage = this.getLanguage();
                this.selectedSearchProvider = this.getEnabledSearchProviders();
            },

            submit() {
                this.setDockBounce(this.dockBounce);
                this.setLanguage(this.selectedLanguage);
                this.setEnabledSearchProviders(this.selectedSearchProvider);
                this.setNotificationsMuted(this.notificationsMuted);
                this.setSoundMuted(this.soundMuted);

                this.persistState();

                // TODO: check if neccesary to reboot app
                // if so tell the user
            },

            ...mapActions('settings', [
                'setDockBounce',
                'setEnabledSearchProviders',
                'setLanguage',
                'setNotificationsMuted',
                'setSoundMuted',
                'persistState',
            ]),

            ...mapGetters('settings', [
                'getDockBounce',
                'getEnabledSearchProviders',
                'getLanguage',
                'getNotificationsMuted',
                'getSoundMuted',
            ]),
        },
        watch: {
            shouldUpdateIfValuesChanged() {
                this.setFormValues();
            },
        },
    };
</script>
