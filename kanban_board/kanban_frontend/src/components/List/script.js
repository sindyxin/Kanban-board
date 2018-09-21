import axios from 'axios'
import { mapActions } from "vuex"
import CardsComponent from '../Cards/index.vue'
import CardformComponent from '../CardForm/index.vue'
import ListEditFormComponent from '../ListEditForm/index.vue'

import deleteFunctions from '../../api_functions/delete_functions'
import getFunctions from '../../api_functions/get_functions'

export default {
  name: 'ListComponent',
  props: {
    boardID: {
      type: [String, Number],
      required: false
    },
    listID: {
      type: Number,
      required: false
    },
    list: {
      type: Object,
      required: true
    }
  },
  components: {
    'cards-component': CardsComponent,
    'cardform-component': CardformComponent,
    'listeditform-component': ListEditFormComponent
  },
  data() {
    return {
      // mutableList: JSON.parse(this.list),
      // list: '',
      // listCards:[],
      isShow: false,
      isEdit: false
    }
  },
  // computed: {
  //   list(){
  //     return this.$store.getters.list(this.listID)
  //   }
  // },
  methods: {
    //try fetch data after submit form with mapAction
    // ...mapActions([
    //   'error',
    //   'loadList'
    // ]),
    toggle() {
      this.isShow = !this.isShow
    },

    toggleEdit(list) {
      console.log('editcard', list)
      this.isEdit = !this.isEdit
    },

    deleteItem() {
      deleteFunctions.deleteList(this.listID)
        .then((response) => {
          this.$router.replace(`/boards/${this.boardID}`)
        })
        .catch((error) => {
          this.$store.dispatch('error', error)
        })
    },

    loadData() {
    //   try {
    //     const getListResponse = await getFunctions.getListByID(this.listID)
    //     console.log('a', getListResponse)
    //     this.list = getListResponse.data
    //   } catch (error) {
    //     console.log(error)
    //   }
      // await this.$store.dispatch('loadList', this.listID)
      axios.get(`http://127.0.0.1:8000/api/all_lists/${this.listID}`)
        .then((response)=>{       
          this.list = response.data
        })
        .catch(function(error){
          console.log(error);
        })
        .then(function(){

        });
      // async loadCardsInList () {
      //   // await this.$store.dispatch('loadList', this.listID)
      //   try {
      //     const getCardsInListResponse = await this.$store.dispatch('loadCardsInList', this.listID)
      //     console.log('cardsinl', getCardsInListResponse)
      //     this.listCards = getCardsInListResponse.data
      //     console.log('lists load cards', this.cards)
      //   } catch (error) {
      //     console.log(error)
      //   }

      // }
    },
    created() {
      this.loadData()
    }
    
  }
}
