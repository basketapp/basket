// TODO: make this file not necesary
import settings from '../settings';

import en from './lang/en.json';
import nl from './lang/nl.json';

const locale = settings.getSync('settings.language')?.toString();

export {
    locale,
    en,
    nl
};
