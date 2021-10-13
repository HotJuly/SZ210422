<template>
  <div id="app" class="B">
    <B></B>
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
