import axios from 'axios'
import putFunctions from '../../api_functions/put_functions'

export default {
  name: 'ListEditFormComponent',
  props: {
    boardID: {
      type: [String, Number],
      required: true
    },
    // listID: {
    //   type: String,
    //   required: false
    // },
    list: {
      type: Object,
      requires: true
    }
  },
  data() {
    return {
      name: this.list.name,
      isEdit: true
    }

  },
  methods: {
    toggleEdit(){
      this.isEdit = !this.isEdit
    },

    async editList(){
      let formData = {
        "name": this.name,
        "board": this.boardID,
        "cards": []
      }
      putFunctions.putList(this.list.id, formData)
      .then((response) => {
        this.$router.replace(`/boards/${this.boardID}`)
      })
      .catch((error) => {
        this.$store.dispatch('error', error)
      })
     
    }

  }
}
