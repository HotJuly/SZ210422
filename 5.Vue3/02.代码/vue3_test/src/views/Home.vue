<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      msg:123,
    }
  },
  props:["a"],
  setup(props, context){

    console.log(props.a, context)
    return{
    }
  },
}
</script>
