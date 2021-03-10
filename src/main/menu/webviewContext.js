import { shell } from 'electron';
import searchProviders from '../../renderer/library/searchProviders';
import { locale, en, nl } from '../i18n';

const language = locale === 'en' ? en : nl;

class WebviewContext {
    constructor(settings, selectedText) {
        const searchActions = settings
            .getSync('settings.enabledSearchProviders')
            .filter((searchProvider) => searchProvider in searchProviders)
            // eslint-disable-next-line arrow-body-style
            .map((searchProvider) => {
                return {
                    label: `${language.search.replace(
                        '{provider}',
                        searchProvider,
                    )} "${
                        selectedText.length > 15
                            ? `${selectedText.slice(0, 15)}...`
                            : selectedText
                    }"`,
                    visible: true,
                    click() {
                        const url = searchProviders[searchProvider].replace(
                            'SEARCH',
                            selectedText,
                        );
                        shell.openExternal(url);
                    },
                };
            });

        return [...searchActions];
    }
}

export default WebviewContext;
