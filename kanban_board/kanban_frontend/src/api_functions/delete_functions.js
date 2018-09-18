import axios from 'axios'

export default {
  deleteRequest (apiURL, id) {
    return axios.delete(apiURL + id + '/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  deleteBoard (id) {
    return this.deleteRequest('http://127.0.0.1:8000/api/all_boards/', id)
  },
  deleteList (id) {
    return this.deleteRequest('http://127.0.0.1:8000/api/all_lists/', id)
  },
  deleteCard (id) {
    console.log('backend-delete', id)
    return this.deleteRequest('http://127.0.0.1:8000/api/all_cards/', id)
  },
  deleteComment (id) {
    return this.deleteRequest('http://127.0.0.1:8000/api/all_comments/', id)
  }
}
