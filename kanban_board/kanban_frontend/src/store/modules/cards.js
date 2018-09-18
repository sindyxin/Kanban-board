import Vue from 'vue'

import getFunctions from '../../api_functions/get_functions'
import postFunctions from '../../api_functions/post_functions'

const ADD_CARD_ID = 'ADD_CARD_ID'
const ADD_CARD = 'ADD_CARD'
const SET_CARDS = 'SET_CARDS'
const SET_CARD = 'SET_CARD'
const UPDATE_CARD = 'UPDATE_CARD'

const state = {
  cards: {},
  cardIDs: []
}

const getters = {
  card: (state) => (cardID) => {
    return state.cards[cardID]
  },
  cards (state) {
    return state.cards
  },
  cardIDs (state) {
    return state.cardIDs
  },
  cardsAsArray: (state) => state.cardIDs.map(cardID => state.cards[cardID]),

  cardsByIDs: (state) => (cardIDs) => {
    let cards = []

    cardIDs.forEach(cardID => {
      let card = state.cards[cardID]
      if (card) {
        cards.push(card)
      }
    })
    return cards
  },
  commentsInCard: (state, getters) => (cardID) => {
    return getters.card(cardID).comments
  }

}

const mutations = {
  [ADD_CARD_ID] (state, cardID) {
    state.cardIDs.push(cardID)
  },
  [ADD_CARD] (state, card) {
    state.cards[card.id] = card
  },

  [SET_CARDS] (state, cards) {
    state.cards = cards
    // Vue.set(state, 'cards', cards)
  },
  [SET_CARD] (state, card) {
    Vue.set(state.cards, card.id, card)
  },
  [UPDATE_CARD] (state, card) {
    state.cards[card.id] = card
  }
}

const actions = {
  async loadCards ({commit, dispatch, getters}, listID) {
    try {
      const getCardsResponse = await getFunctions.getCardsInList(listID)
      this.cards = getCardsResponse.data
      commit(SET_CARDS, this.cards)
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  },

  async loadCard ({commit, dispatch, getters}, cardID) {
    try {
      let getCardResponse = await getFunctions.getCardByID(cardID)
      commit(SET_CARD, getCardResponse.data)

      if (!getters.cardIDs.includes(cardID)) {
        commit(ADD_CARD_ID, getCardResponse.data.id)
      }
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  },

  async addCard ({commit, dispatch}, formData) {
    try {
      console.log(formData)
      const postCardResponse = await postFunctions.postCard(formData)
      commit(ADD_CARD, postCardResponse.data)
      commit(ADD_CARD_ID, postCardResponse.data.id)
      // try load cards data
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  }
  // async updateCard ({ commit, dispatch }, card) {
  //   try {
  //     console.log('patch-card', card, card.id)
  //     const putCardResponse = await putFunctions.putCard(card)
  //     commit(UPDATE_CARD, putCardResponse.data)
  //   } catch (error) {
  //     dispatch('error', error, { root: true })
  //   }
  // }

}
export default ({
  state,
  getters,
  mutations,
  actions
})
