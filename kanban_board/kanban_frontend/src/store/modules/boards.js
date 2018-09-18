import Vue from 'vue'

import getFunctions from '../../api_functions/get_functions'
import postFunctions from '../../api_functions/post_functions'

const ADD_BOARD_ID = 'ADD_BOARD_ID'
const ADD_BOARD = 'ADD_BOARD'
const SET_BOARDS = 'SET_BOARDS'
const SET_BOARD_IDS = 'SET_BOARD_IDS'
const SET_BOARD = 'SET_BOARD'
const UPDATE_BOARD = 'UPDATE_BOARD'
// const UPSERT_BOARDS = 'UPSERT_BOARDS'
// const UPSERT_BOARD_IDS = 'UPSERT_BOARD_IDS'

const state = {
  boards: {},
  boardIDs: []

}

const getters = {
  getBoardByID: (state) => (boardID) => {
    return state.boards[boardID]
  },
  boards (state) {
    return state.boards
  },
  boardIDs (state) {
    return state.boardIDs
  },
  boardsAsArray: (state) => state.boardIDs.map(boardID => state.boards[boardID]),

  boardsByIDs: (state) => (boardIDs) => {
    let boards = []

    boardIDs.forEach(boardID => {
      let board = state.boards[boardID]
      if (board) {
        boards.push(board)
      }
    })
    return boards
  },
  listsInBoard: (state, getters) => (boardID) => {
    return getters.board(boardID).lists
  }

}

const mutations = {
  [ADD_BOARD_ID] (state, boardID) {
    state.boardIDs.push(boardID)
  },
  [ADD_BOARD] (state, board) {
    state.board[board.id] = board
  },
  [SET_BOARDS] (state, boards) {
    Vue.set(state, 'boards', boards)
  },
  [SET_BOARD_IDS] (state, boardIDs) {
    state.boardIDs = boardIDs
  },
  [SET_BOARD] (state, board) {
    Vue.set(state.boards, board.id, board)
  },
  [UPDATE_BOARD] (state, board) {
    state.boards[board.id] = board
  }
  // [UPSERT_BOARD_IDS] (state, boardIDs) {
  //   boardIDs.forEach(boardID => {
  //     if (!state.boardIDs.includes(boardID)) {
  //       state.boardIDs.push(boardID)
  //     }
  //   })
  // },
  // [UPSERT_BOARDS] (state, boards) {
  //   state.boards = Object.assign({}, state.boards, boards)
  // }
}

const actions = {
  async addBoard ({ commit, dispatch }, formData) {
    try {
      console.log('boards-store', formData)
      const postBoardResponse = await postFunctions.postBoard(formData)
      commit(ADD_BOARD, postBoardResponse.data)
      commit(ADD_BOARD_ID, postBoardResponse.data.id)
      // commit(SET_BOARD, postBoardResponse.data)
      // commit(UPDATE_BOARD, postBoardResponse.data)
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  },
  // async loadBoards (commit, dispatch) {
  //   try {
  //     let getResponse = await getFunctions.getAllBoards()
  //     commit(SET_BOARDS, getResponse.data)
  //     // console.log('boards-store-getresponse', commit(SET_BOARDS, getResponse.data))
  //   } catch (error) {
  //     dispatch('', error, { root: true })
  //   }
  // },
  async loadBoard ({commit, dispatch, getters}, boardID) {
    try {
      let getBoardResponse = await getFunctions.getBoardByID(boardID)
      commit(SET_BOARD, getBoardResponse.data)

      if (!getters.boardIDs.includes(boardID)) {
        commit(ADD_BOARD_ID, getBoardResponse.data.id)
      }
    } catch (error) {
      dispatch('', error, { root: true })
    }
  },
  async loadBoards ({commit, dispatch}, boardIDs) {
    let getBoardsRequests = []
    boardIDs.forEach(boardID => {
      getBoardsRequests.push(getFunctions.getBoardByID(boardID))
    })
    try {
      const getBoardResponses = await Promise.all(getBoardsRequests)
      getBoardResponses.forEach(getBoardResponse => {
        commit(SET_BOARD, getBoardResponse.data)
      })
      commit(SET_BOARD_IDS, boardIDs)
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
