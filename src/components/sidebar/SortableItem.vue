<template>
    <li>
        <Service :service="item" />
    </li>
</template>

<script>
    import { ElementMixin } from 'vue-slicksort';
    import Service from './items/Service';

    export default {
        mixins: [ElementMixin],
        components: {
            Service,
        },
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .button {
        margin-left: auto;
    }

    .slick-item {
        z-index: 9999;
        border: 0;
    }
</style>
