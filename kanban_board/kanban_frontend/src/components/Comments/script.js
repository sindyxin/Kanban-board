import axios from 'axios'
import getFunctions from '../../api_functions/get_functions'
import CommentFormComponent from '../CommentForm/index.vue'

export default {
    name: 'CommentsComponent',
    props:{
      cardID: {
        type: Number,
        required: true
      }
    },
    components: {
      'commentform-component':CommentFormComponent,
    },      
    data () {
      return {
        comments:'',
        isShow: false
      }
    },
    methods: {

      async loadData() {
        try {
          // const getCommentsResponse = await getFunctions.getCommentsInCard(this.cardID)
          // this.comments = getCommentsResponse.data
          await this.$store.dispatch('loadAllCommentsForCard', this.cardID)
        } catch (error) {
          console.log(error);
        }
         
      },
      toggle() {
        this.isShow = !this.isShow
      }
      
    },
    created () {
      this.loadData();
    }
}

      // loadData () {
      //   axios.get(`http://127.0.0.1:8000/api/all_cards/${this.cardID}/comments`)
      //     .then((response)=>{       
      //       this.comments = response.data
      //       console.log(this.comments)
      //     })
      //     .catch(function(error){
      //       console.log(error);
      //     })
      //     .then(function(){
  
      //     });
      // }