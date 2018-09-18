// import axios from 'axios'
import CommentsComponent from '../Comments/index.vue'
import CardEditFormComponent from '../CardEditForm/index.vue'
import deleteFunctions from '../../api_functions/delete_functions'
import getFunctions from '../../api_functions/get_functions'

export default {
    name: 'CardComponent',
    props: {    
      listID: {
        type: Number,
        required: true
      },
      cardID: {
        type: Number,
        required: false
      },
      boardID: {
        type: Number,
        required: false
      }
    },
    data () {
      return {
        card:'',
        cards:[],
        isShow: false,
        isEdit: false      
      }
    },
    computed: {
      watchCards() {
        return this.$store.getters.card
      }
    },
    components:{
      'comments-component':CommentsComponent,
      'cardeditform-component':CardEditFormComponent
    },
    methods: {
      toggle () {
        this.isShow = !this.isShow
      },
      toggleEdit (card) {
        console.log('editcard', card)
        this.isEdit = !this.isEdit
      },

      async loadData() {
        try {
          const getCardResponse = await getFunctions.getCardByID(this.cardID)
          this.card = getCardResponse.data
          // await this.$store.dispatch('loadCard', this.cardID)
          // await this.$store.dispatch('loadcards', this.listID)
          // console.log("card-component",this.$store.getters.card)
        } catch (error) {
          console.log(error);
        }
      },
      async loadDatas() {
        try {
          const getCardsResponse = await getFunctions.getCardsInList(this.listID)
          this.cards = getCardsResponse.data
          this.$router.replace(`/boards/${this.boardID}`)
          // await this.$store.dispatch('loadCard', this.cardID)
          // await this.$store.dispatch('loadcards', this.listID)
          console.log("card-component",this.$store.getters.cards)
        } catch (error) {
          console.log(error);
        }
      },
      deleteItem(){
        deleteFunctions.deleteCard(this.cardID)
        .then((response) => {
          this.loadDatas()
          // this.$store.dispatch('loadCards', this.listID)
          this.$router.replace(`/boards/${this.boardID}`)
        })
        .catch((error) => {
          this.$store.dispatch('error', error)
        })
      }
    },
    created () {
      this.loadData();
    }
}

      // loadData () {
      //   axios.get(`http://127.0.0.1:8000/api/all_cards/${this.cardID}`)
      //     .then((response)=>{       
      //       this.card = response.data
      //     })
      //     .catch(function(error){
      //       console.log(error);
      //     })
      //     .then(function(){
  
      //     });
      // },