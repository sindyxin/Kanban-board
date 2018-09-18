const SET_SHOW_CARD_CREATE_FORM = 'SET_SHOW_CARD_CREATE_FORM'
const TOGGLE_SHOW_CARD_CREATE_FORM = 'TOGGLE_SHOW_CARD_CREATE_FORM'

const state = {
  showCardCreateForm: false
};

const getters = {
    showCardCreateForm (state) {
    return state.showCardCreateForm;
  }
};

const mutations = {
  [SET_SHOW_CARD_CREATE_FORM] (state, isShowing) {
    state.showCardCreateForm = isShowing
  },
  [TOGGLE_SHOW_CARD_CREATE_FORM] (state) {
    state.showCardCreateForm = !state.showCardCreateForm;
  }
};

const actions = {
  setShowCardCreateForm ({ commit }, isShowing) {
    commit(SET_SHOW_CARD_CREATE_FORM, isShowing);
  },
  toggleShowCardCreateForm ({ commit }) {
    commit(TOGGLE_SHOW_CARD_CREATE_FORM);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}