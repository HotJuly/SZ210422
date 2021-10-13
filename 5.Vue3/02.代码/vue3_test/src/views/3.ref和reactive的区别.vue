<template>
  <div class="home">
    <div>姓名:{{user1.name}}</div>
    <div>姓名:{{user1.age}}</div>
    <div>
      他的妻子:
        <p>姓名:{{user1.wife.name}}</p>
        <p>姓名:{{user1.wife.age}}</p>
    </div>
    <button @click="handleClick">牛头人</button>
  </div>
</template>

<script>
import {ref,reactive} from 'vue';
export default {
  name: 'Home',
  data(){
    return{
      msg:123,
    }
  },
  setup(){

    // ref如果遇到对象数据类型,会根据该对象生成一个全新的代理对象(使用reactive将对象变成代理对象)
    // console.log(props.a, context)

    // ref具有value属性,该属性是响应式的,如果修改该属性,视图会重新渲染
    const user3={
      name:"laowang",
      age:38,
      wife:{
        name:"xiaohong",
        age:17.99
      }
    }

    const user1 = ref({
      name:"xiaoming",
      age:18,
      wife:{
        name:"xiaohong",
        age:17
      }
    })

    let user2 = reactive({
      name:"xiaoming",
      age:18,
      wife:{
        name:"xiaohong",
        age:17
      }
    })

    const handleClick = ()=>{
      user1.value=user3;
      // console.log(user1)
      // user2=user3
      // user2.name="laowang"
    }


    return{
      user1,
      user2,
      handleClick
    }
  },
}
</script>
