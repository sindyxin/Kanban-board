import Vue from 'vue'

import getFunctions from '../../api_functions/get_functions'
import postFunctions from '../../api_functions/post_functions'

const ADD_LIST_ID = 'ADD_LIST_ID'
const ADD_LIST = 'ADD_LIST'
const SET_LISTS = 'SET_LISTS'
const SET_LIST = 'SET_LIST'
const UPDATE_LIST = 'UPDATE_LIST'
// const SET_SUBMITTING_LIST = 'SET_SUBMITTING_LIST'

const state = {
  lists: {},
  listIDs: []
  // submittingList: false
}

const getters = {
  list: (state) => (listID) => {
    return state.lists[listID]
  },
  lists (state) {
    return state.lists
  },
  listIDs (state) {
    return state.listIDs
  },
  listsAsArray: (state) => state.listIDs.map(listID => state.lists[listID]),

  listsByIDs: (state) => (listIDs) => {
    let lists = []

    listIDs.forEach(listID => {
      let list = state.lists[listID]
      if (list) {
        lists.push(list)
      }
    })
    return lists
  }

}

const mutations = {
  [ADD_LIST_ID] (state, listID) {
    state.listIDs.push(listID)
  },
  [ADD_LIST] (state, list) {
    state.lists[list.id] = list
  },

  [SET_LISTS] (state, lists) {
    Vue.set(state, 'lists', lists)
  },
  [SET_LIST] (state, list) {
    Vue.set(state.lists, list.id, list)
  },
  [UPDATE_LIST] (state, list) {
    state.lists[list.id] = list
  }
}

const actions = {

  async addList ({ commit, dispatch }, formData) {
    try {
      console.log(formData)
      const postListResponse = await postFunctions.postList(formData)
      commit(ADD_LIST, postListResponse.data)
      commit(ADD_LIST_ID, postListResponse.data.id)
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  },
  async updateList ({ dispatch }, { listID, list }) {
    try {
      console.log(listID, list)
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  },
  // async loadLists (commit, dispatch) {
  //   try {
  //     let getResponse = await getFunctions.getAllLists()
  //     commit(SET_LISTS, getResponse.data)
  //   } catch (error) {
  //     dispatch('addHttpError', { root: true })
  //   }
  // },
  async loadList ({ commit, dispatch, getters }, listID) {
    try {
      let getListResponse = await getFunctions.getListByID(listID)
      console.log('get-list', getListResponse.data)
      commit(SET_LIST, getListResponse.data)
      // if (!getters.listIDs.includes(listID)) {
      //   commit(ADD_LIST_ID, getListResponse.data.id)
      // }
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  }
}

export default ({
  state,
  getters,
  mutations,
  actions
})
