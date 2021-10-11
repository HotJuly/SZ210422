<template>
  <div id="app">
    <h1 v-if="isShow" @click="showHello">APP.VUE</h1>
    <input ref="input123" v-else type="text" :value="msg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{doublePhone}}
    {{doublePhone}}
    {{doublePhone}}
    {{doublePhone}}
    {{doublePhone}}
    {{doublePhone}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue';

export default {
  name: 'App',
  data(){
    return {
      msg:"App",
      isShow:true,
      user:{
        phone:18888
      }
    }
  },
  components: {
    HelloWorld
  },
  a:2,
  computed:{
    // doublePhone(){
    //   console.log('doublePhone')
    //   return this.user.phone * 2;
    // }
    doublePhone:(vm)=>{
      console.log('doublePhone')
      return vm.user.phone * 2;
    }
  },
  mounted(){
    // try{
    // console.log('c',c)
    // }catch(e){
    //   console.log('e',e)
    // }

    // this.isShow = false;
    // // 此处似乎具有一个看不见的nextTick

    // Promise.resolve().then(()=>{
    //   console.log('Promise1')
    // })

    // this.$nextTick(()=>{
    //   console.log('$nextTick1')
    // })

    // Promise.resolve().then(()=>{
    //   console.log('Promise2')
    // })

    // this.$nextTick(()=>{
    //   console.log('$nextTick2')
    // })

    console.log('1',this.$options.name)


  },
  methods:{
    showHello(){
      // console.log('showHello')
      // const HelloWorldClass = Vue.extend(HelloWorld);
      // const helloworld  = new HelloWorldClass();
      // // console.log('showHello',new HelloWorldClass())
      // helloworld.$mount(document.body)

      //响应式:当某些属性被修改,页面会重新渲染
      // Vue更新视图是异步更新(是在微任务中更新的)
      // 可以让代码延迟执行的方法,宏任务或者微任务.then
      // this.isShow=false;

      // 该行代码必须在DOM更新之后才执行
      // this.$nextTick(()=>{
      //   this.$refs.input123.focus();
      // })

      // this.$nextTick().then(()=>{
      //   this.$refs.input123.focus();
      // })

      // this.user.phone = 166666;
      // console.log(this.user.phone)
      // Vue.set(this.user,"phone",166666)
      // this.$set(this.user,"phone",166666)
      // this.user={
      //   phone:1666666
      // }
      // this.user={};
      this.user.phone=1666666;

      // delete this.user.phone
      // console.log('user',this.user)
      // Vue.delete( this.user, "phone" )
      // console.log('user',this.user)
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
