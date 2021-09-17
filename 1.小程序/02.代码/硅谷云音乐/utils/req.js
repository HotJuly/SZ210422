/*
  封装代码的核心思想
    1.保留重复出现的部分
    2.将每次都不同的部分提取出来
    3.最终提取出来的可变内容,由外部传入

  封装函数
    1.保留重复出现的代码
    2.将每次都不相同的内容提取出来,作为形参
    3.谁调用谁传入实参

  封装组件
    1.保留重复出现的代码(html+css)
    2.将每次不同的内容提取出来,作为props
    3.谁使用谁传入标签属性

 */

import config from './config.js';

export default function(url,data={},method="GET"){
  // let result;
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.mpHost + url,
      data,
      method,
      success: (res) => {
        // console.log('res', res)
        // result = res.data

        // res是响应报文,其中包括了响应头,cookie,响应体等数据
        // 类似于axios中,响应拦截器中return response.data;
        resolve(res.data)

        // this.setData({
        //   banners: res.data.banners
        // })
      }
    })
  })
  // return result;
}