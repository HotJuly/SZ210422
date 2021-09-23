import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 小程序开发中:小程序/页面/组件三者区分的非常清楚
// 创建小程序:App,创建页面:Page,创建组件:Component
// 当前代码的意思,是告知uniapp,当前这个App组件代表整个小程序
// mp->mini program type->类型
App.mpType = 'app'


//在创建Vue的实例对象
// 相当于小程序中的App(),注册小程序
const app = new Vue({
    ...App
	// {
	// onLaunch: function() {
	// 	console.log('App Launch')
	// },
	// onShow: function() {
	// 	console.log('App Show')
	// },
	// onHide: function() {
	// 	console.log('App Hide')
	// },
	// globalData:{}
	// }
})
app.$mount()
