import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
// Vue.use(ElementUI)

Vue.config.productionTip = false

/*
  需求:将所有组件配置对象的a属性+=1
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   console.log('optionMergeStrategies',parent, child, vm)
//   return child + 1
// }

// Vue.config.devtools = false;

/*
  问题:如何捕获项目中出现的错误
    使用try...catch...实现对部分代码进行错误捕获
  
  问题二:如何捕获项目上线之后出现的错误
    1.如何知道用户电脑上出现的错误
      -捕获用户出现的错误
        非Vue框架:window.onerror=function(error){...}
        Vue框架:Vue.config.errorHandler=function(){...}
      -获取到用户出现的错误
        将错误信息通过ajax发送给公司服务器,公司维护人员会将所有的错误信息,转交给我们
*/
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log('errorHandler',err, vm, info)
// }

// Vue.filter('timeFilter', function (value) {
//   // 返回处理后的值
//   return value +"atguigu"
// })

/*
  需求:当组件挂载之后,需要打印当前组件名称

*/

// Vue.mixin({
//   mounted(){
//     console.log(this.$options.name)
//   }
// })

/*
  el或者$mount的实参都是用来被替换的元素
*/

/*
  Vue中,可以影响到页面渲染结果的地方有几个
    1.index.html中的节点内容
    2.new Vue的配置对象的template字符串
    3.new Vue的配置对象的render函数

    这三者渲染的优先级:redner函数>template字符串>index.html模版
    .vue文件中的template最终也会被vue-loader编译成render函数
*/
new Vue({
  name:"Root",
  template:"<div><span>{{ msg }}</span></div>",
  data: {
    msg: 'hello',
    msg2:"hello world"
  },
  // el:"#app",
  render: h => h(App),
}).$mount('#app')

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   render: res.render
// }).$mount('#app')