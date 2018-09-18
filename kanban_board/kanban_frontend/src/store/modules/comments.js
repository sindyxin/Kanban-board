import Vue from 'vue'

import getFunctions from '../../api_functions/get_functions'
import postFunctions from '../../api_functions/post_functions'

const ADD_COMMENT_ID = 'ADD_COMMENT_ID'
const ADD_COMMENT = 'ADD_COMMENT'
const SET_COMMENTS = 'SET_COMMENTS'
const SET_COMMENT_IDS = 'SET_COMMENT_IDS'
const SET_COMMENT = 'SET_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const UPSERT_COMMENTS = 'UPSERT_COMMENTS'
const UPSERT_COMMENT_IDS = 'UPSERT_COMMENT_IDS'

const state = {
  comments: {},
  commentIDs: []
}

const getters = {
  getCommentByID: (state) => (commentID) => {
    return state.comments[commentID]
  },
  comments (state) {
    return state.comments
  },
  commentIDs (state) {
    return state.commentIDs
  },
  commentsAsArray: (state) => state.commentIDs.map(commentID => state.comments[commentID]),

  commentsByIDs: (state) => (commentIDs) => {
    let comments = []

    commentIDs.forEach(commentID => {
      let comment = state.comments[commentID]
      if (comment) {
        comments.push(comment)
      }
    })
    return comments
  },
  commentsForCard: (state, getters) => (cardID) => {
    return getters.card(cardID).comments
  }
}
const mutations = {
  [ADD_COMMENT_ID] (state, commentID) {
    state.commentIDs.push(commentID)
  },
  [ADD_COMMENT] (state, comment) {
    state.comment[comment.id] = comment
  },
  [SET_COMMENTS] (state, comments) {
    Vue.set(state, 'comments', comments)
  },
  [SET_COMMENT_IDS] (state, commentIDs) {
    state.commentIDs = commentIDs
  },
  [SET_COMMENT] (state, comment) {
    Vue.set(state.comments, comment.id, comment)
  },
  [UPDATE_COMMENT] (state, comment) {
    state.comments[comment.id] = comment
  },
  [UPSERT_COMMENT_IDS] (state, commentIDs) {
    commentIDs.forEach(commentID => {
      if (!state.commentIDs.includes(commentID)) {
        state.commentIDs.push(commentID)
      }
    })
  },
  [UPSERT_COMMENTS] (state, comments) {
    state.comments = Object.assign({}, state.comments, comments)
  }
}

const actions = {
  async loadAllCommentsForCard ({ commit, dispatch }, cardID) {
    try {
      const getAllCommentsForCardResponse = await getFunctions.getCommentsInCard(cardID)
      commit(UPSERT_COMMENTS, getAllCommentsForCardResponse.data.comments)
      commit(UPSERT_COMMENT_IDS, getAllCommentsForCardResponse.data.result)
    } catch (error) {
      dispatch('error', error, { root: true })
    }
  },
  setCommentIDs ({ commit }, commentIDs) {
    commit(SET_COMMENT_IDS, commentIDs)
  },
  setComments ({ commit }, comments) {
    commit(SET_COMMENTS, comments)
  },
  setCommentsWithIDs ({ commit }, comments) {
    commit(SET_COMMENTS, comments)
    commit(SET_COMMENT_IDS, Object.keys(comments).map(commentID => parseInt(commentID)))
  },
  async addComment ({ commit, dispatch }, formData) {
    try {
      console.log(formData)
      const postCommentResponse = await postFunctions.postComment(formData)
      commit(ADD_COMMENT, postCommentResponse.data)
      commit(ADD_COMMENT_ID, postCommentResponse.data.id)
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
