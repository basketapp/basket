import { createApp } from 'vue';
import { plugin as Slicksort } from 'vue-slicksort';
import i18n from './config/vue-i18n';
import store from './config/store';
import App from './components/App';

createApp(App) // Please format nicely
    .use(i18n)
    .use(store)
    .use(Slicksort)
    .mount('#app');
