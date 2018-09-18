import axios from 'axios'

export default {
  putRequest (apiURL, id, jsonData) {
    return axios.put(apiURL + id + '/', JSON.stringify(jsonData), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  putBoard (id, jsonData) {
    return this.putRequest('http://127.0.0.1:8000/api/all_boards/', id, jsonData)
  },
  putList (id, jsonData) {
    return this.putRequest('http://127.0.0.1:8000/api/all_lists/', id, jsonData)
  },
  putCard (id, jsonData) {
    console.log('backend-put', id, jsonData)
    return this.putRequest('http://127.0.0.1:8000/api/all_cards/', id, jsonData)
  },
  putComment (id, jsonData) {
    return this.putRequest('http://127.0.0.1:8000/api/all_comments/', id, jsonData)
  }

}
