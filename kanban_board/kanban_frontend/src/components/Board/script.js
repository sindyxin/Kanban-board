// import axios from 'axios'
import ListsComponent from '../Lists/index.vue'
import BoardsComponent from '../Boards/index.vue'
import getFunctions from '../../api_functions/get_functions'
import deleteFunctions from '../../api_functions/delete_functions'
import BoardEditFormComponent from '../BoardEditForm/index.vue'

export default {
  name: 'Board',
  props: {
    boardID:{
      type: String,
      required: true
    }
  },
  components: {
    'lists-component': ListsComponent,
    'boards-component': BoardsComponent,
    'boardeditform-component': BoardEditFormComponent
  },
  data() {
    return {
      board: '',
      boards: [],  // for pagination
      isEdit: false,
      index:0

    }
  },
  methods: {
    async loadBoards() {
      try {
        const getBoardsResponse = await getFunctions.getAllBoards()
        this.boards = getBoardsResponse.data        
      } catch (error) {
        console.log(error);
      }      
    },
    async loadData() {
      try {
        const getBoardResponse = await getFunctions.getBoardByID (this.boardID)
        this.board = getBoardResponse.data
        await this.$store.dispatch('loadBoard', this.boardID)
        console.log("board-component-kjdskjd", this.$store.getters.boards)
      } catch (error) {
        console.log(error);
      }      
    },
    toggleEdit(board) {
      console.log('editcard', board)
      this.isEdit = !this.isEdit
    },
    deleteBoard(){
      deleteFunctions.deleteBoard(this.boardID)
      .then((response) => {
        this.loadBoards()
        this.$router.replace(`/boards/${this.boards[index]}`)
        // this.data = response.data
      })
      .catch((error) => {
        this.$store.dispatch('error', error)
      })
    },
  },
  created() {
    this.loadData();
    this.loadBoards();
  }
}
//  axios.get(`http://127.0.0.1:8000/api/all_boards/${this.id}`)