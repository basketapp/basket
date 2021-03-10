<template>
    <div class="views">
        <div
            :key="service.identifier"
            v-for="service in enabledServices"
            class="view"
            :class="{ 'view-active': service.visible }"
        >
            <ServiceWebview :service="service"></ServiceWebview>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ServiceWebview from './webview/ServiceWebview';

    export default {
        name: 'Webviews',
        components: {
            ServiceWebview,
        },
        computed: {
            ...mapGetters('services', ['enabledServices']),
        },
    };
</script>
<style lang="scss">
    .views {
        width: 100%;
        height: 100%;

        .view {
            display: none;
            flex: 1;
            height: 100%;
            background-color: $silver;

            &-active {
                display: block;
            }
        }
    }
</style>
