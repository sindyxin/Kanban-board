import axios from 'axios'
export default {
  name: 'listform',
  props: {
    boardID: {
      type: [Number, String],
      required: true
    },
    listID: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      name: ''
    }

  },
  methods: {
    async addList(){
      let formData = {
        "name": this.name,
        "board": this.boardID,
        "cards": []
      }
      this.$store.dispatch('addList', formData)
      // this.$store.dispatch('updateList', formData)
      this.$router.push(`/boards/${this.boardID}`)
    }

  }
}
