<template>
  <div id="app" class="B">
    <router-view></router-view>
    <router-link to="/">A</router-link>
    <!-- <router-link to="/about">B</router-link> -->
    <button @click="toB">to B</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  methods:{
    toB(){
      this.$router.push('/about')
    }
  },
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
