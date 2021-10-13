<template>
  <div class="home">
    <h1>X:{{pageX}}</h1>
    <h1>Y:{{pageY}}</h1>
  </div>
</template>

<script>
// import {ref,onMounted} from 'vue'
import useMousePosition from '@/hooks/useMousePosition';
export default {
  name: 'Home',
  setup(){
    /*
      Vue3提供了可以通过js动态注入生命周期的方法
      需求:当用户在页面上点击时,将用户当前的点击坐标显示在页面上
      拆解:
        1.如何知道用户在页面上点击了?
        2.如何知道用户点击的坐标?
        3.如何将坐标值显示在页面上?
    */

    // const pageX= ref(-1);
    // const pageY= ref(-1);

    // onMounted(()=>{
    //   // console.log('onMounted')
    //   document.addEventListener('click',function(event){
    //     // console.log('click',event)
    //     const {clientX,clientY} = event;
    //     pageX.value=clientX;
    //     pageY.value=clientY;
    //   })
    // })

    const {pageX,pageY} = useMousePosition();

    return{
      pageX,
      pageY
    }
  },
  // data(){

  // },
  // computed:{
  // },
  // watch:{
  // },
  mounted(){
    console.log('mounted')
  }
}
</script>
