<template>
  <div class="home">
    <input ref="input11111" type="text">
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
export default {
  name: 'Home',
  setup(){
    const input11111 = ref(null);
    onMounted(()=>{
      console.log(input11111)
      input11111.value.focus();
    })
    return{
      input11111
    }
  },
  // mounted(){
  //   this.$refs.input111.focus();
  // }
}
</script>
