import axios from 'axios'

export default {
  getRequest (apiURL, params = null) {
    return axios.get(apiURL, {
      params: params
    })
  },
  getAllBoards () {
    return this.getRequest('http://127.0.0.1:8000/api/all_boards/all')
  },
  getBoardByID (boardID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_boards/${boardID}/`)
  },
  getListsInBoard (boardID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_boards/${boardID}/lists/`)
  },
  getAllLists () {
    return this.getRequest('http://127.0.0.1:8000/api/all_lists/all')
  },
  getListByID (listID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_lists/${listID}/`)
  },
  getCardsInList (listID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_lists/${listID}/cards/`)
  },
  getAllCards () {
    return this.getRequest('http://127.0.0.1:8000/api/all_cards/all')
  },
  getCardByID (cardID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_cards/${cardID}/`)
  },
  getCommentsInCard (cardID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_cards/${cardID}/comments/`)
  },
  getAllComments () {
    return this.getRequest('http://127.0.0.1:8000/api/all_comments/all')
  },
  getCommentByID (commentID) {
    return this.getRequest(`http://127.0.0.1:8000/api/all_comments/${commentID}/`)
  }
}
