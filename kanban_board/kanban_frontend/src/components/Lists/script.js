import axios from 'axios'
// import CardsComponent from '../Cards/index.vue'
// import CardformComponent from '../CardForm/index.vue'
import getFunctions from '../../api_functions/get_functions'
import ListComponent from '../List/index.vue'
export default {
    name: 'ListsComponent',
    props:{
      boardID: {
        type: Number,
        required: true
      }
    },
    components:{
      // 'cards-component':CardsComponent,
      // 'cardform-component':CardformComponent,
      'list-component': ListComponent
    },
    data () {
      return {
        lists:''
        // isShow:false,     
      }
    },
    methods: {
      // toggle(){
      //   this.isShow = !this.isShow;
      // },
      async loadData() {
        try {
          const getListsResponse = await getFunctions.getListsInBoard(this.boardID)
          this.lists = getListsResponse.data
          // await this.$store.dispatch('loadLists', this.boardID)
        } catch (error) {
          console.log(error);
        }
         
      }
      // loadData () {
      //   axios.get(`http://127.0.0.1:8000/api/all_boards/${this.boardID}/lists`)
      //     .then((response)=>{       
      //       this.lists = response.data
      //     })
      //     .catch(function(error){
      //       console.log(error);
      //     })
      //     .then(function(){
  
      //     });
      // },
    },
    created () {
      this.loadData();
    }
}