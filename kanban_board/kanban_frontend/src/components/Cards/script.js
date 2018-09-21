import axios from 'axios'
import { mapActions } from "vuex"
import CardComponent from '../Card/index.vue'
import getFunctions from '../../api_functions/get_functions'

export default {
    name: 'CardsComponent',
    props:['listID', 'boardID', 'list'],
    data() {
      return {
        cards: []
      }
    },
    // computed: {
    //   cardsList() {
    //     return this.$store.getters.cards
    //     // get(){return this.$store.getters.cards},
    //     // set(){return this.$store.commit('SET_CARDS', this.cards)}
    //   }
    // },
    components:{
      'card-component':CardComponent
    },
    methods: {
      //try fetch data after submit form with mapAction
      ...mapActions([
        'error',
        'loadCards',
        'loadCard',
        'addCard'
      ]),
      async loadCards () {
        try {
          const cardsResponse = await getFunctions.getCardsInList(this.listID)
          // this.cards = await this.$store.dispatch('loadCards', this.listID)
          this.cards = cardsResponse.data
          console.log('cards-c', this.cards)
          this.$router.replace(`/boards/${this.boardID}`)
          
        } catch (error) {
          console.log(error)
        }
      }
    },
    created () {
      this.loadCards();
    }
}
