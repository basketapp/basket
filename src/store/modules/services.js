import { v4 as uuidv4 } from 'uuid';

const state = {
    activeService: null,
    services: [
        {
            icon: './static/services/slack.svg',
            identifier: 'G3aHRDw7aQyfncv5L7d',
            index: 0,
            visible: true,
            title: 'Slack',
            url: 'https://slack.com',
            soundEnabled: true,
            notificationsEnabled: true,
            enabled: true,
        },
        {
            icon: './static/services/whatsapp.svg',
            identifier: 'sBfhUVp2Aw6N8cvvJ3Zp',
            index: 1,
            visible: false,
            title: 'Whatsapp',
            url: 'https://web.whatsapp.com',
            soundEnabled: true,
            notificationsEnabled: true,
            enabled: true,
        },
    ],
};

const getters = {
    // eslint-disable-next-line arrow-body-style
    enabledServices: (state) => {
        return state.services.filter((service) => service.enabled === true);
    },
};

const actions = {
    async addService({ commit, state }) {
        const newService = {
            icon: './static/icons/basket.svg',
            identifier: uuidv4(),
            index: state.services.length,
            visible: false,
            title: 'New service',
            url: './preferences.html',
        };

        commit('addService', newService);

        commit(
            'changeActiveService',
            state.services[state.services.length - 1].identifier,
        );
    },

    toggleService({ commit }, identifier) {
        commit('toggleService', identifier);
    },

    setActive({ commit }, identifier) {
        commit('changeActiveService', identifier);
    },
};

const mutations = {
    addService(state, service) {
        state.services.push(service);
    },

    changeActiveService(state, identifier) {
        state.services.forEach((service) => {
            service.visible = false;
        });

        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.visible = true;
            });
    },

    toggleService(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.enabled = !service.enabled;
            });

        console.log(state.services);
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
