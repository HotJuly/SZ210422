<template>
  <div id="app" class="B">
    <h1>APP.VUE</h1>
    <h2>{{a}}</h2>
    <HelloWorld111 class="ABC" v-model="a" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      a:"haha"
    }
  },
  provide:{
    haha:"123"
  },
  components: {
    HelloWorld111:HelloWorld
  },
  computed:{
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
