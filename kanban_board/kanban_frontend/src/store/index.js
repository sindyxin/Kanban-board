import Vuex from 'vuex'
import Vue from 'vue'

import boardStore from './modules/boards'
import listStore from './modules/lists'
import cardStore from './modules/cards'
import commentStore from './modules/comments'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    boardStore,
    listStore,
    cardStore,
    commentStore
  }
})
