// import axios from 'axios'
// import getFunctions from '../../api_functions/get_functions'
import putFunctions from '../../api_functions/put_functions'

export default {
  name: 'CardEditFormComponent',
  props: {    
    cardID: {
      type: Number,
      required: false
    },
    listID: {
      type: Number,
      required: true
    },
    boardID: {
      type: Number,
      required: false
    },
    card: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      name: this.card.name,
      description: this.card.description,
      isEdit: true
    }
  },
  methods: {

    toggleEdit(){
      this.isEdit = !this.isEdit
    },
    // use vuex via dispatch actions to post
    async editCard(){
      let formData = {
        "name": this.name,
        "description": this.description,
        "card_list":this.listID,
        "comments": [],
        "assigned":[]
      }
      putFunctions.putCard(this.cardID, formData)      
      .then((response) => {
        // this.$store.dispatch('loadCards', this.listID)
        this.$router.replace(`/boards/${this.boardID}`)
      })
      .catch((error) => {
        this.$store.dispatch('error', error)
      })

    }
  //   async loadData() {
  //     try {
  //       // const getCardsResponse = await getFunctions.getCardsInList(this.listID)
  //       await this.$store.dispatch('loadCards', this.listID)              

  //     } catch (error) {
  //       console.log(error);
  //     }
       
  //   }
  // },
  // created() {
  //   this.loadData();
  
  }

}

