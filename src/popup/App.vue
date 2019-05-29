<template>
  <div>
    <input type="text" v-model="word"  v-on:keyup.enter="search()">
    <button @click="search()" >Ara</button>
    <hr>
    <ul>
      <li v-for="(result, index) in results.anlamlarListe" :key="index">{{ result.anlam }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      word: '',
      results: []
    }
  },
  methods: {
    search() {
      axios.get(`http://sozluk.gov.tr/gts?ara=${this.word}`).then(res =>  {
        this.results = res.data[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>