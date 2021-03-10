import { v4 as uuidv4 } from 'uuid';
import settings from '../../settings';

const state = {
    services: [],
};

const getters = {
    // eslint-disable-next-line arrow-body-style
    activeService: (state) => {
        return state.services.filter((service) => service.visible === true)[0];
    },

    // eslint-disable-next-line arrow-body-style
    allServices: (state) => {
        return state.services;
    },

    // eslint-disable-next-line arrow-body-style
    enabledServices: (state) => {
        return state.services.filter((service) => service.enabled === true);
    },

    // eslint-disable-next-line arrow-body-style
    sortedServices: (state) => {
        return state.services
            .slice()
            .sort((a, b) => (a.index > b.index ? 1 : -1));
    },

    // eslint-disable-next-line arrow-body-style
    serviceByIdentifier: (state) => (identifier) => {
        return state.services.filter(
            (service) => service.identifier === identifier,
        )[0];
    },

    // eslint-disable-next-line arrow-body-style
    getTotalNotificationCount: (state) => {
        return state.services
            .filter((service) => service.enabled === true)
            .map((service) => service.notificationCount || 0)
            .reduce((a, b) => a + b);
    },
};

const actions = {
    async loadServices({ commit }) {
        commit('setServices', (await settings.get('services')) || []);
    },

    addService({ commit, state }) {
        const newServiceIdentifier = uuidv4();
        const newService = {
            icon: './static/icons/basket.svg',
            enabled: true,
            identifier: newServiceIdentifier,
            index: state.services.length,
            visible: false,
            title: 'New service',
            url: 'https://source.unsplash.com/random/1600x900',
        };

        commit('addService', newService);
        commit('changeActiveService', newServiceIdentifier);

        settings.set('services', state.services);

        return newServiceIdentifier;
    },

    async hideAllServices({ commit, state }) {
        commit('hideAllServices');

        await settings.set('services', state.services);
    },

    removeService({ commit, state }, identifier) {
        commit('removeService', identifier);

        commit('correctIndex');

        settings.set('services', state.services);
    },

    setActive({ commit, state }, identifier) {
        commit('changeActiveService', identifier);

        settings.set('services', state.services);
    },

    setMessageCount({ commit }, data) {
        commit('setMessageCount', data);
    },

    setIcon({ commit, state }, data) {
        commit('setIcon', data);

        settings.set('services', state.services);
    },

    setServices({ commit, state }, services) {
        commit('setServices', services);

        commit('correctIndex');

        settings.set('services', state.services);
    },

    toggleNotifications({ commit, state }, identifier) {
        commit('toggleNotifications', identifier);

        settings.set('services', state.services);
    },

    toggleService({ commit, getters, state }, identifier) {
        commit('toggleService', identifier);

        if (
            getters.activeService.identifier === identifier &&
            getters.enabledServices.length
        ) {
            commit(
                'changeActiveService',
                getters.enabledServices[0].identifier,
            );
        }

        settings.set('services', state.services);
    },

    toggleSound({ commit, state }, identifier) {
        commit('toggleSound', identifier);

        settings.set('services', state.services);
    },

    updateService({ commit, state }, data) {
        commit('updateService', data);

        settings.set('services', state.services);
    },
};

const mutations = {
    addService(state, service) {
        state.services.push(service);
    },

    updateService(state, data) {
        state.services
            .filter((service) => service.identifier === data.identifier)
            .forEach((service) => {
                service.title = data.title;
                service.url = data.url;
                service.notificationsEnabled = data.notificationsEnabled;
                service.soundEnabled = data.soundEnabled;
                service.enabled = data.enabled;
            });
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

    correctIndex(state) {
        state.services.forEach((service, index) => {
            service.index = index;
        });
    },

    hideAllServices(state) {
        state.services.forEach((service) => {
            service.visible = false;
        });
    },

    removeService(state, identifier) {
        const index = state.services.indexOf(
            state.services.filter(
                (service) => service.identifier === identifier,
            )[0],
        );
        state.services.splice(index, 1);
    },

    setMessageCount(state, data) {
        state.services
            .filter((service) => service.identifier === data.identifier)
            .forEach((service) => {
                service.notificationCount = data.count;
            });
    },

    setIcon(state, data) {
        state.services
            .filter((service) => service.identifier === data.identifier)
            .forEach((service) => {
                if (!service.customIcon) {
                    service.icon = data.icon;
                }
            });
    },

    setServices(state, services) {
        state.services = services;
    },

    toggleNotifications(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.notificationsEnabled = !service.notificationsEnabled;
            });
    },

    toggleService(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.enabled = !service.enabled;
            });
    },

    toggleSound(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.soundEnabled = !service.soundEnabled;
            });
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
