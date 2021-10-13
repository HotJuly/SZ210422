<template>
  <div id="app" class="B">
    <h1 ref="app" @click="handleClick">APP.VUE</h1>
    <h2 v-once>{{b}}</h2>
    <!-- <HelloWorld111 msg="App" :a1="b" v-on:update:a1="handleSync"/> -->
    <!-- <keep-alive> -->
      <!-- <A v-if="isShow"></A>
      <B v-else></B> -->
      <!-- <router-view></router-view>
    </keep-alive> -->
    <!-- <component :is="showComponent"></component> -->

    <A>
      <template v-slot:default>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是header插槽</h1>
      </template>
      <template v-slot:footer="{msg}">
        <h1>我是footer插槽,{{msg}}</h1>
      </template>
    </A>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  data(){
    return {
      a:"haha",
      b:"666",
      isShow:true,
      showComponent:A
    }
  },
  provide:{
    haha:"123"
  },
  components: {
    HelloWorld111:HelloWorld,
    A,
    B
  },
  computed:{
  },
  mounted(){
    // console.log('mounted',this.$children[0].inputValue)
    // var temp = this.$children[0];
    // this.$children[0] = this.$children[1];
    // this.$children[1] = temp;

    // console.log('refs',this.$refs.hello)
  },
  methods:{
    handleSync(data){
      // console.log(111,data)
      this.b=data
    },
    handleClick(){
      this.isShow=!this.isShow;
      // this.showComponent=this.showComponent===A?B:A;
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
