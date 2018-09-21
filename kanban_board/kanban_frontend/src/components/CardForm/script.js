import axios from 'axios'
import { mapActions } from "vuex"
import getFunctions from '../../api_functions/get_functions'
import postFunctions from '../../api_functions/post_functions'

export default {
  name: 'CardformComponent',
  props: {    
    boardID: {
      type: Number,
      required: false
    },
    listID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      name:'',
      description: '',
      isShow: true
      
    }
  },
  computed: {
    cards() {
      return this.$store.getters.cards
    }
  },
  methods: {
    //try fetch data after submit form with mapAction
    ...mapActions([
      'error',
      'loadCards',
      'loadCard',
      'addCard'
    ]),
    loadCards () {
      this.$store.dispatch('loadCards', this.listID)
    },
    toggle(){
      this.isShow = !this.isShow;
    },
    addCard(){
      let formData = {
        "name": this.name,
        "description": this.description,
        "card_list":this.listID,
        "comments": [],
        "assigned":[]
      }
      this.$store.dispatch('addCard', formData)
      this.$store.dispatch('loadCards', this.listID)
      this.$router.replace(`/boards/${this.boardID}`)
    }, 
    created() {
      this.loadCards();
    }
  }
}
