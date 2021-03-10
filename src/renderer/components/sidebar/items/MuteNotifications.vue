<template>
    <Tab identifier="mutenotifications" :icon="icon" :click="toggle" />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';

    export default {
        name: 'MuteNotifications',
        components: {
            Tab,
        },
        computed: {
            icon() {
                return this.$store.state.settings.notificationsMuted
                    ? 'static/icons/notifications_off-black-18dp.svg'
                    : 'static/icons/notifications-white-18dp.svg';
            },
        },
        methods: {
            toggle() {
                this.toggleNotifications();
                this.persistState();
            },

            ...mapActions('settings', ['toggleNotifications', 'persistState']),
        },
    };
</script>
