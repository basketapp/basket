import { createI18n } from 'vue-i18n';

import settings from '../library/settings';

import en from '../resources/lang/en.json';
import nl from '../resources/lang/nl.json';

const locale = settings.getSync('settings.language');

export default createI18n({
    locale: locale?.toString() || 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    legacy: false,
    messages: {
        en,
        nl,
    },
});
