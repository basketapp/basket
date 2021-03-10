<template>
    <Tab
        identifier="mutenotifications"
        icon="static/icons/add_circle-white-18dp.svg"
        :click="addServiceHandler"
    />
</template>

<script>
    import { ipcRenderer } from 'electron';
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';

    export default {
        name: 'AddService',
        components: {
            Tab,
        },
        methods: {
            async addServiceHandler() {
                const newServiceIdentifier = await this.addService();
                this.showServicePanel(newServiceIdentifier);

                ipcRenderer.send('re-draw-menu');
            },

            ...mapActions('services', ['addService']),

            ...mapActions('panels', ['showServicePanel']),
        },
    };
</script>
