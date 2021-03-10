import { createStore } from 'vuex'

import panels from '../store/panels';
import services from '../store/services';
import settings from '../store/settings';

export default createStore({
    modules: {
        panels,
        settings,
        services,
    },
    strict: process.env.NODE_ENV !== 'production',
});
