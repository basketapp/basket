import settings from '../../settings';

const state = {
    soundMuted: false,
    notificationsMuted: false,
    dockBounce: false,
    enabledSearchProviders: ['google'],
    language: 'en',
};

const getters = {
    getNotificationsMuted: (state) => state.notificationsMuted,

    getSoundMuted: (state) => state.soundMuted,

    getDockBounce: (state) => state.dockBounce,

    getEnabledSearchProviders: (state) => state.enabledSearchProviders,

    getLanguage: (state) => state.language,
};

const actions = {
    async loadSettings({ commit }) {
        commit(
            'setNotifications',
            await settings.get('settings.notificationsMuted'),
        );
        commit('setSound', await settings.get('settings.soundMuted'));
        commit('setDockBounce', await settings.get('settings.dockBounce'));
        commit(
            'setEnabledSearchProviders',
            await settings.get('settings.enabledSearchProviders'),
        );
        commit('setLanguage', await settings.get('settings.language'));
    },

    async persistState({ state }) {
        settings.set('settings', state);
    },

    async toggleNotifications({ commit, state }) {
        const notificationsMuted = !state.notificationsMuted;

        commit('setNotifications', notificationsMuted);
    },

    async toggleSound({ commit, state }) {
        const soundMuted = !state.soundMuted;

        commit('setSound', soundMuted);
    },

    async setNotificationsMuted({ commit }, value) {
        commit('setNotifications', value);
    },

    async setSoundMuted({ commit }, value) {
        commit('setSound', value);
    },

    async setDockBounce({ commit }, value) {
        commit('setDockBounce', value);
    },

    async setEnabledSearchProviders({ commit }, value) {
        commit('setEnabledSearchProviders', value);
    },

    async setLanguage({ commit }, value) {
        commit('setLanguage', value);
    },
};

const mutations = {
    setNotifications(state, value) {
        state.notificationsMuted = value;
    },

    setSound(state, value) {
        state.soundMuted = value;
    },

    setDockBounce(state, value) {
        state.dockBounce = value;
    },

    setEnabledSearchProviders(state, value) {
        state.enabledSearchProviders = value;
    },

    setLanguage(state, value) {
        state.language = value;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
