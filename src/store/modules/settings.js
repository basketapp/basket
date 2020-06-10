import settings from "electron-settings";

const state = {
    soundMuted: false,
    notificationsMuted: false,
};

const getters = {
    getNotificationsMuted: state => state.notificationsMuted,

    getSoundMuted: state => state.soundMuted,
};

const actions = {
    async loadSettings({ commit, state }, data) {
        commit('setNotifications', await settings.get("notificationsMuted"));
        commit('setSound', await settings.get("soundMuted"));
    },

    async toggleNotifications({ commit, state }, data) {
        const notificationsMuted = !state.notificationsMuted;

        commit('setNotifications', notificationsMuted);

        // Persist to disk
        await settings.set("notificationsMuted", notificationsMuted);
    },

    async toggleSound({ commit, state }, data) {
        const soundMuted = !state.soundMuted;

        commit('setSound', soundMuted);

        // Persist to disk
        await settings.set("soundMuted", soundMuted);
    },
};

const mutations = {

    setNotifications(state, value) {
        state.notificationsMuted = value;
    },

    setSound(state, value) {
        state.soundMuted = value;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
