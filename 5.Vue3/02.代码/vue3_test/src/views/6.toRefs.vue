<template>
  <div class="home">
    <!-- <h1>name:{{user.name}}</h1>
    <h1>age:{{user.age}}</h1>
    <h1>sex:{{user.sex}}</h1> -->
    <h1>name:{{name}}</h1>
    <h1>age:{{age}}</h1>
    <h1>sex:{{sex}}</h1>
    <button @click="addAge">了一年</button>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
  name: 'Home',
  setup(){
    const user=reactive({
      name:"xiaoming",
      age:18,
      sex:"男"
    })

    const user2 = toRefs(user);
    console.log('user2',user2,user)

    const addAge=()=>{
      user.age++;
      console.log(user.age)
    }

    return{
      // ...user,
      // name:"xiaoming",
      // age:18,
      // sex:"男",
      ...user2,
      addAge
    }
  }
}
</script>
