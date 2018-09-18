import { mapActions, mapGetters } from 'vuex'

import putFunctions from '../../api_functions/put_functions'
import getFunctions from '../../api_functions/get_functions'

export default {
  name: 'boardeditform',
  props: {
    boardID: {
      type: Number,
      required: false
    },
    board: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name:this.board.name,
      isEdit:true
    }
  },
  methods:{
    loadBoard(){
      this.$store.dispatch('loadBoard', this.boardID)
    },
    toggleEdit(){
      this.isEdit = !this.isEdit
    },
    async editBoard(){
      this.data = this
      let formData = {
        "name": this.name,
        "lists":[]
      }
      putFunctions.putBoard(this.boardID, formData)      
      .then((response) => {
        this.data = response.data
        console.log('edit-data', this.data)
        // this.$store.getters.board
        this.$router.replace(`/boards/${this.boardID}`)
      })
      .catch((error) => {
        this.$store.dispatch('error', error)
      })
    }
  },
}
