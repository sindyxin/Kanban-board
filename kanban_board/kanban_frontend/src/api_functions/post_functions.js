import axios from 'axios'

export default {
  postRequest (apiURL, jsonData) {
    console.log(apiURL, jsonData)
    return axios.post(apiURL, JSON.stringify(jsonData), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  postBoard (jsonData) {
    return this.postRequest('http://localhost:8000/api/all_boards/', jsonData)
  },
  postList (jsonData) {
    return this.postRequest('http://localhost:8000/api/all_lists/', jsonData)
  },
  postCard (jsonData) {
    return this.postRequest('http://localhost:8000/api/all_cards/', jsonData)
  },
  postComment (jsonData) {
    return this.postRequest('http://localhost:8000/api/all_comments/', jsonData)
  }
}
