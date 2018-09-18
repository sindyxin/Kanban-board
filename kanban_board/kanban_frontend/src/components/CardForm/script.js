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
      isShow: true,
      cards:[]
    }
  },
  computed: {
    watchCards() {
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
    async loadData() {
      // this.$store.dispatch('loadCards', this.listID)
      try {
        const getCardsResponse = await getFunctions.getCardsInList(this.listID)
        this.cards = getCardsResponse.data
        console.log('mu sencond"af sharing', this.cards)
        this.$store.commit('SET_CARDS', this.cards)
        await this.$store.dispatch('loadCards', this.listID)
      } catch (error) {
        console.log(error);
      }         
    },
    toggle(){
      this.isShow = !this.isShow;
    },

    async addCard() {
      let formData = {
        "name": this.name,
        "description": this.description,
        "card_list":this.listID,
        "comments": [],
        "assigned":[]
      }
      try {
        await postFunctions.postCard(formData)
        .then((response) => {
          console.log('add-card', response)
          this.$store.commit('SET_CARD', response.data)
          this.$router.replace(`/boards/${this.boardID}`)
        })
       
        
      } catch (error) {
        this.error(error)
        console.log(error);
      }
    
    // use vuex via dispatch actions to post
    // async addCard(){
    //   let formData = {
    //     "name": this.name,
    //     "description": this.description,
    //     "card_list":this.listID,
    //     "comments": [],
    //     "assigned":[]
    //   }
    //   this.$store.dispatch('addCard', formData)
    //   // this.$store.commit('ADD_CARD', formData)
    //   this.$store.dispatch('loadCards', this.listID)
    //   // this.$store.dispatch('loadCards', this.listID)
    //   // this.$store.commit('SET_CARDS',  watchCards())
    //   this.$router.push(`/boards/${this.boardID}`)

    },

    created() {
      this.loadData();
    }
  }

}

    // use vue axios to post
    // async addCard() {
    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/api/all_cards/',
    //     data: {
    //       name: this.name,
    //       description: this.description,
    //       card_list:this.listID,
    //       comments: [],  
    //     }
    //   })
    //   this.$router.replace(`/boards/${this.boardID}`)
    // },

      //   async loadData() {
  //     try {
  //       // const getCardsResponse = await getFunctions.getCardsInList(this.listID)
  //       await this.$store.dispatch('loadCards', this.listID)              

  //     } catch (error) {
  //       console.log(error);
  //     }
       
  //   }
  // },