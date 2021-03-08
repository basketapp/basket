import Vue from 'vue';
import VueI18n from 'vue-i18n';

import settings from '../library/settings';

import en from '../resources/lang/en.json';
import nl from '../resources/lang/nl.json';

Vue.use(VueI18n);

const locale = settings.getSync('settings.language');
const i18n = new VueI18n({
    locale: locale?.toString() || 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        nl,
    },
});

export default i18n;
