<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="addA">+1</button>
    <h1>{{a}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import {ref} from 'vue';
export default {
  name: 'Home',
  // data(){
  //   return{
  //     a:1
  //   }
  // },
  // methods:{
  //   handleClick(){
  //     this.a+=1
  //   }
  // },
  setup(){
    /*
      setup是Vue3新增的一个生命周期
      该生命周期会在beforeCreate之前执行
      这个生命周期必须返回一个对象

      ref可以将一个普通数据变成响应式数据
      ref对象如果用于模版展示时,不需要写.value,可以直接书写属性名称
      ref函数返回一个对象.该对象身上具有value属性,该属性是响应式的(Object.defineProperty)
    */
    // console.log('------------setup------------')
    let a = ref(1);
    // console.log(a)

    const addA = ()=>{
      console.log('addA')
      a.value+=1;
      // console.log(a)
    }
    return{
      a,
      addA
    }
  },
  // beforeCreate(){
  //   console.log('------------beforeCreate------------')
  // },
  // created(){
  //   console.log('------------created------------')
  // }
}
</script>
