import axios from 'axios'
import { mapActions } from "vuex"
import CardComponent from '../Card/index.vue'
import getFunctions from '../../api_functions/get_functions'

export default {
    name: 'CardsComponent',
    props:['listID', 'boardID', 'list'],
    data () {
      return {
        cards:''       
      }
    },
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
      async loadData() {
        // this.$store.dispatch('loadCards', this.listID)
        try {
          const getCardsResponse = await getFunctions.getCardsInList(this.listID)
          this.cards = getCardsResponse.data
          //this.$store.commit('SET_CARDS', this.cards)
          // await this.$store.dispatch('loadCards', this.listID)
        } catch (error) {
          this.$store.dispatch('error', error)
          console.log(error);
        }         
      }
    },
    created () {
      this.loadData();
    },

}

      // loadData(){
      //   this.$store.dispatch('loadCards', this.listID)
      // }
      // loadData () {
      //   axios.get(`http://127.0.0.1:8000/api/all_lists/${this.listID}/cards`)
      //     .then((response)=>{       
      //       this.cards = response.data
      //     })
      //     .catch(function(error){
      //       console.log(error);
      //     })
      //     .then(function(){
  
      //     });
      // }