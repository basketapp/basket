<template>
    <Tab identifier="preferences" :icon="icon" :click="clickHandler" />
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Tab from '../tabs/Tab';

    export default {
        name: 'Preferences',
        components: {
            Tab,
        },
        computed: {
            icon() {
                return this.currentActivePanel === 'preferences'
                    ? 'static/icons/settings-white-18dp.svg'
                    : 'static/icons/settings-black-18dp.svg';
            },
            currentActivePanel() {
                return this.activePanel();
            },
        },
        methods: {
            async clickHandler() {
                this.togglePreferencesPanel();

                if (document.activeElement) {
                    document.activeElement.blur();
                }
            },

            ...mapActions('panels', ['togglePreferencesPanel']),
            ...mapGetters('panels', ['activePanel']),
        },
    };
</script>
