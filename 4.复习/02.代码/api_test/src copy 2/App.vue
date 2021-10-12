<template>
  <div id="app" class="B">
    <h1 ref="app" @click="handleClick">APP.VUE</h1>
    <h2 v-once>{{b}}</h2>
    <!-- <HelloWorld111 ref="hello" class="ABC" v-model="a" msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld111 ref="hello" class="ABC" :value="a" @input="data=>a=data" msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld111 msg="App" :a1.sync="b"/> -->
    <HelloWorld111 msg="App" :a1="b" v-on:update:a1="handleSync"/>
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
    handleSync(data){
      console.log(111,data)
      this.b=data
    },
    handleClick(){
      this.$destroy();
      console.log('handleClick')
    }
  },
  watch:{
    a(){

    }
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
