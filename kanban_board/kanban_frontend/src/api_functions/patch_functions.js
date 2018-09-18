import axios from 'axios'

export default {
  patchRequest (apiURL, id, jsonData) {
    return axios.put(apiURL + id + '/', JSON.stringify(jsonData), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  pacthBoard (id, jsonData) {
    return this.patchRequest('http://127.0.0.1:8000/api/all_boards/', id, jsonData)
  },
  pacthList (id, jsonData) {
    return this.patchRequest('http://127.0.0.1:8000/api/all_lists/', id, jsonData)
  },
  pacthCard (id, jsonData) {
    console.log('patch', id, jsonData)
    return this.patchRequest('http://127.0.0.1:8000/api/all_cards/', id, jsonData)
  },
  pacthComment (id, jsonData) {
    return this.patchRequest('http://127.0.0.1:8000/api/all_comments/', id, jsonData)
  }

}
