<template>
    <!-- eslint-disable vue/no-v-model-argument -->
    <SortableList lock-axis="y" :distance="2" v-model:list="services">
        <SortableItem
            v-for="(service, index) in services"
            :index="index"
            :key="index"
            :item="service"
            class="slick-item"
        />
    </SortableList>
    <!-- eslint-enable -->
</template>

<script>
    import { ipcRenderer } from 'electron';
    import { mapActions, mapGetters } from 'vuex';
    import SortableList from './SortableList.vue';
    import SortableItem from './SortableItem.vue';

    export default {
        name: 'Services',
        components: {
            SortableList,
            SortableItem,
        },
        computed: {
            services: {
                get() {
                    return this.sortedServices;
                },

                async set(value) {
                    await this.setServices(value);

                    ipcRenderer.send('re-draw-menu');
                },
            },

            ...mapGetters('services', ['sortedServices']),
        },

        methods: {
            ...mapActions('services', ['setServices']),
        },
    };
</script>
