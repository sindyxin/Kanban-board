export default {
  name: 'boardform',
  props:{
    // boardsList:{
    //   type:Array,
    //   required:true
    // }
    // boardID:{
    //   type: String,
    //   required: false
    // },
    // indexNumber:{
    //   type: Number,
    //   required: false
    // }
  },
  data () {
    return {
      name:''

    }
  },
  methods:{
    async addBoard(){
      let formData = {
        "name": this.name,
        "lists":[]
      }
      this.$store.dispatch('addBoard', formData)
      // this.$store.commit('UPDATE_BOARD', formData)
      // console.log("board-form", this.$store.dispatch('addBoard', formData))
      this.$router.push('/boards/1')
    }
  }
}
