<template>
  <div id="app">
    <ul>
      <h1>名字:{{user.name}}</h1>
      <h1>年龄:{{user.age}}</h1>
      <li v-for="item in arr" :key="item">
        {{item}}
      </li>
    </ul>
    <button @click="changeCar">换辆车</button>
    <button @click="handleClick">公开数据</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  data(){
    return{
      // msg:123
      arr:["玛莎拉蒂","劳斯莱斯幻影"],
      user:{
        name:"xiaoming"
      }
    }
  },
  methods:{
    changeCar(){
      // this.arr.splice(1,1,"五菱宏光")
      // Vue2中不会对数据的下标进行响应式处理,length属性也不会
      // 但是Vue2将数组能够操作自身的方法都进行了重写
      this.arr[1]="五菱宏光"
      console.log(this.arr)
    },
    handleClick(){
      // this.user.age=18;
      // this.$set(this.user,"age",18)
      // delete this.user.name
      this.$delete(this.user,"name")
      console.log(this.user)
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
