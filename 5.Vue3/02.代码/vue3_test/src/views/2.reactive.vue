<template>
  <div class="home">
    <h1>名字:{{user.name}}</h1>
    <h1>年龄:{{user.age}}</h1>
    <!-- <h1>名字:{{user.name}}</h1> -->
    <ul>
      <li v-for="item in user.cars" :key="item">
        {{item}}
      </li>
    </ul>
    <button @click="changeName">换老爸了</button>
    <button @click="addCar">有钱了,买辆车</button>
    <button @click="handleClick">公开数据</button>
  </div>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: 'Home',
  setup(){
    /*
      使用reactive函数可以将一个对象变成响应式对象
      reactive会返回一个Proxy对象
      用户对Proxy对象做任何事,Proxy都会对原数据对象做同样的事
      语法:reactive(原数据对象)
      reactive会对内部所有的数据进行深度监视
      对原数据对象做任何事都不会触发响应式效果,只有对Proxy对象做事情,才会导致响应式触发
    
    */
   const user2 = {
      name:"xiaoming",
      cars:["玛莎拉蒂","法拉利"]
    }

    const user = reactive(user2)
    
  
    console.log(user2,user)

    const changeName = ()=>{
      user.name="chenxiaoming"
    }

    const addCar = ()=>{
      // user.cars.push("宝马")
      user.cars[1]="劳斯莱斯"
    }

    const handleClick = ()=>{
      // user.age = 18;
      delete user.name
      console.log(user)
    }

    return{
      user,
      changeName,
      addCar,
      handleClick
    }
  },
}
</script>
