// TODO: make this file not necesary
import settings from './settings';

import en from '../resources/lang/en.json';
import nl from '../resources/lang/nl.json';

const locale = settings.getSync('settings.language')?.toString();

export {
    locale,
    en,
    nl
};
