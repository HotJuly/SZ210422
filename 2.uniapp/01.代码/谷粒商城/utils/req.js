import config from './config.js';
	
// 小程序的基础路径必须是完整路径:域名+端口号
// h5的基础路径必须是代理的前缀

// uniapp中需要根据当前的运行环境,来决定基础路径
/* 问题:如何知道当前的运行环境?
	此处一共具有两种方法实现
	1.通过uni.getSystemInfoSync()可以获取到当前系统信息
		其中有一个platform属性记录了当前的运行环境
			如果是devtools就是小程序
			如果是ios就是苹果手机的浏览器
	2.条件编译
		通过#ifdef或者#ifndef指令,实现对部分运行环境进行独特配置
*/

// console.log('uni.getSystemInfoSync()',uni.getSystemInfoSync())
let baseUrl;
// const {platform} = uni.getSystemInfoSync();
// if(platform==="devtools"){
// 	baseUrl = config.mpHost;
// }else if(platform==="ios"){
// 	baseUrl = config.h5Host;
// }

// #ifdef MP-WEIXIN
	baseUrl = config.mpHost;
// #endif

// #ifdef H5
	baseUrl = config.h5Host;
// #endif

export default function(url,data={},method="GET"){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl + url,
			data,
			method,
			header:{
				token:uni.getStorageSync('token')
			},
			success:(res)=>{
				const result = res.data;
				resolve(result);
			}
		})
	})
}