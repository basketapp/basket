const state = {
    activePanel: undefined,
    activePanelService: undefined,
};

const getters = {
    // eslint-disable-next-line arrow-body-style
    activePanel: (state) => {
        return state.activePanel;
    },

    // eslint-disable-next-line arrow-body-style
    activePanelService: (state) => {
        return state.activePanelService;
    },

    // eslint-disable-next-line arrow-body-style
    preferencesPanelActive: (state) => {
        return state.activePanel === 'preferences';
    },

    // eslint-disable-next-line arrow-body-style
    servicePanelActive: (state) => {
        return state.activePanel === 'service';
    },
};

const actions = {
    async hidePanels({ commit }) {
        await commit('setActivePanel', undefined);
        await commit('setActivePanelService', undefined);
    },

    togglePreferencesPanel({ commit, state }) {
        commit(
            'setActivePanel',
            state.activePanel !== 'preferences' ? 'preferences' : undefined,
        );
    },

    async showServicePanel({ commit }, identifier) {
        await commit('setActivePanelService', identifier);
        await commit('setActivePanel', 'service');
    },
};

const mutations = {
    setActivePanel(state, value) {
        state.activePanel = value;
    },

    setActivePanelService(state, value) {
        state.activePanelService = value;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
