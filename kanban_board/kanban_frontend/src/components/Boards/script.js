import axios from 'axios'
import getFunctions from '../../api_functions/get_functions'

export default {
    name: 'BoardsComponent',
    props:{
      boardsList:{
        type:Array,
        required:true
      },
      size:{
        type:Number,
        required:false,
        default: 10
      },
      boardID:{
        type: String,
        required: true
      }
    },
    // props:['boardID'],
    data () {
      return {
        boards:'',
        pageNumber: 0, //defaulet to page 0
        index: this.boardsList.length
      }
    },
    methods: {
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      },
      async loadData() {
        try {
          const getBoardsResponse = await getFunctions.getAllBoards()
          this.boards = getBoardsResponse.data
          console.log('boards-component-script', this.boards)
          // this.$store.commit('SET_CARDS', this.cards)
          // await this.$store.dispatch('loadCards', this.listID)
        } catch (error) {
          console.log(error);
        }         
      },
      changeBoard(id) {
        this.$router.push(`/boards/${id}`)
      },
      getBoardForm() {
        this.$router.push("/boardForm")
      }

      
    },
    computed: {
      pageCount() {
        let l = this.boardsList.length
        let s = this.size
        return Math.floor(l/s)
      },
      paginatedData() {
        const start = this.pageNumber * this.size
        const end = start + this.size
        return this.boardsList.slice(start, end)
      },
      boardsListLength() {
        return this.boardsList.length
      }

    },
    created () {
      this.loadData();
    }
    
}