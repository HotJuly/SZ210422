<template>
  <div class="hello">
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{item}}:</label><input type="text">
      </li>
    </ul>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arr:[1,2,3,4,5,6]
    }
  },
  methods:{
    handleClick(){
      this.arr.splice(2,0,this.arr.length+1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
