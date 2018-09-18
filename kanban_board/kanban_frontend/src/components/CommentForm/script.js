import getFunctions from '../../api_functions/get_functions'
import postFunctions from '../../api_functions/post_functions'

export default {
  name: 'CommentFormComponent',
  props: {    
    cardID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      content:'',
      card: this.cardID,
      user:'',
      isShow: true,
    }
  },
  methods: {
    toggle(){
      this.isShow = !this.isShow;
    },
    // use vuex via dispatch actions to post
    async addComment(){
      let formData = {
        "content": this.content,
        "card": this.cardID,
        "user": []
      }
      this.$store.dispatch('addComment', formData)
      this.$store.commit('SET_COMMENT', formData)
      // this.$store.getters.cards
      this.$router.replace(`/boards/${this.boardID}`)

    }
  
  }

}
