import settings from 'electron-settings';
import { isDevMode } from './environment';

const customSettings = {
    dir: isDevMode ? './' : undefined,
    prettify: true,
};

settings.configure(customSettings);

export default settings;
