<template>
  <div class="home">
    <h1>num:{{num}}</h1>
    <h1>doubleNum:{{doubleNum}}</h1>
    <!-- <h1>threeNum:{{threeNum}}</h1> -->
      fullName3: <input v-model="threeNum"><br>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script>
import {ref,computed,watch, watchEffect} from 'vue';
export default {
  name: 'Home',
  setup(){
    const num = ref(1);

    const doubleNum = computed(()=>{
      return num.value*2
    })

    let threeNum = computed({
      get(){
        return num.value*3
      },
      set(){
        console.log('set')
      }
    })

    const handleClick = ()=>{
      num.value++;
      // threeNum ="123";
    }

    watch([num],()=>{
        console.log('watch update')
    })

    watchEffect(()=>{
        console.log(num.value)
        console.log('watchEffect update')
    })

    return{
      num,
      doubleNum,
      threeNum,
      handleClick
    }
  },
  // data(){

  // },
  // computed:{
      // doubleNum(){
      //   return this.num*2;
      // },
      // threeNum:{
      //   get(){

      //   },
      //   set(){

      //   }
      // }
  // },
  // watch:{
      // num(){
      //   console.log('watch update')
      // }
  // }
}
</script>
