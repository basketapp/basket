import settings from 'electron-settings';

settings.configure({ prettify: true });

const state = {
    soundMuted: false,
    notificationsMuted: false,
    showPreferences: false,
};

const getters = {
    getNotificationsMuted: (state) => state.notificationsMuted,

    getSoundMuted: (state) => state.soundMuted,

    showPreferences: (state) => state.showPreferences,
};

const actions = {
    async loadSettings({ commit }) {
        commit('setNotifications', await settings.get('notificationsMuted'));
        commit('setSound', await settings.get('soundMuted'));
        commit('showPreferences', await settings.get('showPreferences'));
    },

    async hidePreferences({ commit }) {
        commit('hidePreferences');

        // Persist to disk
        await settings.set('showPreferences', state.showPreferences);
    },

    async showPreferences({ commit }) {
        commit('showPreferences');

        // Persist to disk
        await settings.set('showPreferences', state.showPreferences);
    },

    async toggleNotifications({ commit, state }) {
        const notificationsMuted = !state.notificationsMuted;

        commit('setNotifications', notificationsMuted);

        // Persist to disk
        settings.set('notificationsMuted', notificationsMuted);
    },

    async toggleSound({ commit, state }) {
        const soundMuted = !state.soundMuted;

        commit('setSound', soundMuted);

        // Persist to disk
        settings.set('soundMuted', soundMuted);
    },
};

const mutations = {
    hidePreferences(state) {
        state.showPreferences = false;
    },

    setNotifications(state, value) {
        state.notificationsMuted = value;
    },

    setSound(state, value) {
        state.soundMuted = value;
    },

    showPreferences(state) {
        state.showPreferences = true;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
