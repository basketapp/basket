<template>
    <div class="outer-sidebar">
        <div class="sidebar">
            <div class="top" :class="{ mac: isMacOs }">
                <span>basket</span>
            </div>

            <ul class="services">
                <Services />
                <AddService />
            </ul>

            <div class="bottom">
                <MuteSound />
                <MuteNotifications />
                <Preferences />
            </div>
        </div>
    </div>
</template>

<script>
    import AddService from './sidebar/items/AddService';
    import MuteNotifications from './sidebar/items/MuteNotifications';
    import MuteSound from './sidebar/items/MuteSound';
    import Preferences from './sidebar/items/Preferences';
    import Services from './sidebar/Services';
    import { isMac } from '../../environment';

    export default {
        name: 'Sidebar',
        components: {
            AddService,
            MuteNotifications,
            MuteSound,
            Preferences,
            Services,
        },
        data() {
            return {
                isMacOs: isMac,
            };
        },
    };
</script>

<style lang="scss">
    .outer-sidebar {
        flex: 0 0 68px;
        height: 100%;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 68px;
        height: 100%;
        user-select: none;
        background-color: $firefly;

        .top {
            width: 100%;
            height: 26px;
            background-color: $blue-stone;

            span {
                position: absolute;
                padding-top: 2px;
                margin-left: 10px;
                font-family: 'Lato', sans-serif;
                font-size: 16px;
                color: $gallery;
            }
        }

        .mac {
            height: 52px;

            span {
                padding-top: 25px;
            }
        }

        .services {
            position: relative;
            width: 100%;
            height: calc(100% - 262px);
            margin-top: 8px;
            overflow-y: auto;
            list-style-type: none;
            padding-inline-start: 0;
        }

        .services::-webkit-scrollbar {
            width: 0;
            background: transparent; /* make scrollbar transparent */
        }

        .bottom {
            position: absolute;
            width: 100%;
            list-style-type: none;
            padding-inline-start: 0;
        }
    }
</style>
