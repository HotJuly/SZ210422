<template>
  <div class="hello">
    A
    <slot name="default"></slot>
    <slot name="footer" :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:"我是作用域插槽"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
