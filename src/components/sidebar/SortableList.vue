<template>
    <span>
        <slot></slot>
    </span>
</template>

<script>
    import { ContainerMixin } from 'vue-slicksort';

    export default {
        mixins: [ContainerMixin],
    };
</script>

<style lang="scss">
    .list {
        list-style-type: none;
    }
</style>
