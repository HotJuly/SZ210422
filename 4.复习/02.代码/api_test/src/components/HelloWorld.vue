<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <input type="text" :value="a1" @input="handleChange">
    <!-- <input type="text" v-model="inputValue">
    <input type="text" :value="inputValue" @input="event=>inputValue=event.target.value"> -->
    <!-- <el-input v-model="" placeholder=""></el-input> -->
    <!-- <el-form-item label="label">
    </el-form-item> -->
  </div>
</template>

<script>
import mixins from '../mixins';
export default {
  props: {
    msg: String,
    value:String,
    a1:String
  },
  data(){
    return{
      inputValue:123
    }
  },
  inject:["haha"],
  mixins:[mixins],
  mounted(){
    console.log('inject',this.haha)
  },
  model:{
    prop:"a1",
    event:"input123321"
  },
  methods:{
    handleChange(event){
      // console.log('value',event.target.value)
      this.$emit('input123321',event.target.value)
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
