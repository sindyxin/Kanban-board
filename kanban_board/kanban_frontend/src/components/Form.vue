<template>
  <div>
    <form action="" @submit.prevent="onSubmit(inputValue)">
      <input type="text" v-model="inputValue">
      <span class="reversed">{{ reversedInput }}</span>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['reversed'],
  data: () => ({
    inputValue: '',
    results: []
  }),
  computed: {
    reversedInput () {
      return this.reversed
        ? this.inputValue.split('').reverse().join('')
        : this.inputValue
    }
  },
  methods: {
    onSubmit (value) {
      const getPromise = axios.get(
        'https://jsonplaceholder.typicode.com/posts?q=' + value)
      getPromise.then(results => {
        this.results = results.data
      })
      return getPromise
    }
  },
  watch: {
    inputValue (newVal, oldVal) {
      if (newVal.trim().length && newVal !== oldVal) {
        console.log(newVal)
      }
    }
  }
}
</script>
