import Vue from 'vue';
import Vuex from 'vuex';

import panels from '../store/panels';
import services from '../store/services';
import settings from '../store/settings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        panels,
        settings,
        services,
    },
    strict: process.env.NODE_ENV !== 'production',
});
