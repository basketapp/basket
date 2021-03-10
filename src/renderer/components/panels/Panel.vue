<template>
    <div class="panel-wrapper">
        <div class="top" :class="{ mac: isMacOs }">
            <span>{{ title }}</span>

            <a class="close" @click="hidePanels">
                {{ $t('close').toLowerCase() }}
            </a>
        </div>

        <slot></slot>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { isMac } from '../../../environment';

    export default {
        name: 'Panel',
        props: {
            title: {
                required: true,
                type: String,
            },
        },
        data() {
            return {
                isMacOs: isMac,
            };
        },
        methods: {
            ...mapActions('panels', ['hidePanels']),
        },
    };
</script>

<style lang="scss">
    .panel-wrapper {
        position: relative;
        width: 450px;
        height: 100%;
        background-color: #d8dbe2;

        .top {
            width: 100%;
            height: 26px;
            background-color: $blue-stone;

            span {
                position: absolute;
                padding-top: 2px;
                margin-left: 8px;
                font-family: 'Lato', sans-serif;
                font-size: 16px;
                color: $gallery;
            }

            .close {
                float: right;
                padding-top: 2px;
                margin-right: 8px;
                font-family: 'Lato', sans-serif;
                font-size: 16px;
                color: $gallery;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .mac {
            height: 52px;

            span {
                padding-top: 25px;
            }

            .close {
                margin-top: 25px;
            }
        }
    }
</style>
