<template>
  <div id="app" class="B">
    <h1 ref="app">APP.VUE</h1>
    <h2>{{a}}</h2>
    <HelloWorld111 ref="hello" class="ABC" v-model="a" msg="Welcome to Your Vue.js App"/>
    <HelloWorld111 msg="App" a="1" b="2" c="3"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      a:"haha",
      b:"666"
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
    // console.log('mounted',this.$children[0].inputValue)
    // var temp = this.$children[0];
    // this.$children[0] = this.$children[1];
    // this.$children[1] = temp;

    console.log('refs',this.$refs.hello)
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
