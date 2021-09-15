/*
  封装代码的核心思想
    1.保留重复出现的部分
    2.将每次都不同的部分提取出来
    3.最终提取出来的可变内容,由外部传入

  封装函数
    1.保留重复出现的代码
    2.将每次都不相同的内容提取出来,作为形参

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
        resolve(res.data)
        // this.setData({
        //   banners: res.data.banners
        // })
      }
    })
  })
  // return result;
}